import { HttpException } from '@exceptions/HttpException';
import { DB } from '@database';
import { UserSettings } from '@interfaces/user_settings.interface';
import { Service } from 'typedi';

export interface CreateUserSettingsDto {
  userId: string;
  receiveEmail?: boolean;
  receivePush?: boolean;
  securityAlerts?: boolean;
}

export interface UpdateUserSettingsDto {
  receiveEmail?: boolean;
  receivePush?: boolean;
  securityAlerts?: boolean;
}

@Service()
export class UserSettingsService {
  /**
   * Lấy tất cả user settings (admin only)
   */
  public async findAllUserSettings(): Promise<UserSettings[]> {
    const allUserSettings: UserSettings[] = await DB.UserSettings.findAll({
      include: [
        {
          model: DB.Users,
          as: 'user',
          attributes: ['id', 'name', 'email', 'username'],
        },
      ],
    });
    return allUserSettings;
  }

  /**
   * Lấy user settings theo ID
   */
  public async findUserSettingsById(settingsId: string): Promise<UserSettings> {
    const userSettings: UserSettings = await DB.UserSettings.findByPk(settingsId, {
      include: [
        {
          model: DB.Users,
          as: 'user',
          attributes: ['id', 'name', 'email', 'username'],
        },
      ],
    });

    if (!userSettings) throw new HttpException(404, 'User settings not found');
    return userSettings;
  }

  /**
   * Lấy user settings theo userId
   */
  public async findUserSettingsByUserId(userId: string): Promise<UserSettings> {
    // Kiểm tra user có tồn tại không
    const user = await DB.Users.findByPk(userId);
    if (!user) throw new HttpException(404, 'User not found');

    let userSettings: UserSettings = await DB.UserSettings.findOne({
      where: { userId },
      include: [
        {
          model: DB.Users,
          as: 'user',
          attributes: ['id', 'name', 'email', 'username'],
        },
      ],
    });

    // Nếu chưa có settings, tạo mới với default values
    if (!userSettings) {
      userSettings = await this.createUserSettings({
        userId,
        receiveEmail: true,
        receivePush: true,
        securityAlerts: true,
      });
    }

    return userSettings;
  }

  /**
   * Tạo user settings mới
   */
  public async createUserSettings(settingsData: CreateUserSettingsDto): Promise<UserSettings> {
    // Kiểm tra user có tồn tại không
    const user = await DB.Users.findByPk(settingsData.userId);
    if (!user) throw new HttpException(404, 'User not found');

    // Kiểm tra đã có settings chưa
    const existingSettings = await DB.UserSettings.findOne({
      where: { userId: settingsData.userId },
    });

    if (existingSettings) {
      throw new HttpException(409, 'User settings already exist for this user');
    }

    const newUserSettings: UserSettings = await DB.UserSettings.create({
      userId: settingsData.userId,
      receiveEmail: settingsData.receiveEmail ?? true,
      receivePush: settingsData.receivePush ?? true,
      securityAlerts: settingsData.securityAlerts ?? true,
    });

    // Lấy lại với thông tin user
    return await this.findUserSettingsById(newUserSettings.id);
  }

  /**
   * Cập nhật user settings
   */
  public async updateUserSettings(settingsId: string, settingsData: UpdateUserSettingsDto): Promise<UserSettings> {
    const userSettings = await DB.UserSettings.findByPk(settingsId);
    if (!userSettings) throw new HttpException(404, 'User settings not found');

    await DB.UserSettings.update(settingsData, {
      where: { id: settingsId },
    });

    return await this.findUserSettingsById(settingsId);
  }

  /**
   * Cập nhật user settings theo userId
   */
  public async updateUserSettingsByUserId(userId: string, settingsData: UpdateUserSettingsDto): Promise<UserSettings> {
    // Đảm bảo settings tồn tại (tự động tạo nếu chưa có)
    const userSettings = await this.findUserSettingsByUserId(userId);

    await DB.UserSettings.update(settingsData, {
      where: { userId },
    });

    return await this.findUserSettingsByUserId(userId);
  }

  /**
   * Xóa user settings
   */
  public async deleteUserSettings(settingsId: string): Promise<UserSettings> {
    const userSettings = await this.findUserSettingsById(settingsId);

    await DB.UserSettings.destroy({
      where: { id: settingsId },
    });

    return userSettings;
  }

  /**
   * Xóa user settings theo userId
   */
  public async deleteUserSettingsByUserId(userId: string): Promise<UserSettings> {
    const userSettings = await this.findUserSettingsByUserId(userId);

    await DB.UserSettings.destroy({
      where: { userId },
    });

    return userSettings;
  }

  /**
   * Reset user settings về default
   */
  public async resetUserSettings(userId: string): Promise<UserSettings> {
    return await this.updateUserSettingsByUserId(userId, {
      receiveEmail: true,
      receivePush: true,
      securityAlerts: true,
    });
  }

  /**
   * Kiểm tra user có được nhận email không
   */
  public async canReceiveEmail(userId: string): Promise<boolean> {
    try {
      const userSettings = await this.findUserSettingsByUserId(userId);
      return userSettings.receiveEmail;
    } catch (error) {
      // Nếu có lỗi, mặc định cho phép nhận email
      return true;
    }
  }

  /**
   * Kiểm tra user có được nhận push notification không
   */
  public async canReceivePush(userId: string): Promise<boolean> {
    try {
      const userSettings = await this.findUserSettingsByUserId(userId);
      return userSettings.receivePush;
    } catch (error) {
      // Nếu có lỗi, mặc định cho phép nhận push
      return true;
    }
  }

  /**
   * Kiểm tra user có được nhận security alerts không
   */
  public async canReceiveSecurityAlerts(userId: string): Promise<boolean> {
    try {
      const userSettings = await this.findUserSettingsByUserId(userId);
      return userSettings.securityAlerts;
    } catch (error) {
      // Nếu có lỗi, mặc định cho phép nhận security alerts
      return true;
    }
  }

  /**
   * Bulk update settings cho nhiều users
   */
  public async bulkUpdateSettings(userIds: string[], settingsData: UpdateUserSettingsDto): Promise<{ updated: number; failed: string[] }> {
    const results = {
      updated: 0,
      failed: [] as string[],
    };

    for (const userId of userIds) {
      try {
        await this.updateUserSettingsByUserId(userId, settingsData);
        results.updated++;
      } catch (error) {
        results.failed.push(userId);
      }
    }

    return results;
  }
}
