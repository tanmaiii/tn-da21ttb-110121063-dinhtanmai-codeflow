import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { UserSettings } from '@interfaces/user_settings.interface';
import { UserSettingsService, CreateUserSettingsDto, UpdateUserSettingsDto } from '@services/user_settings.service';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';

export class UserSettingsController {
  public userSettingsService = Container.get(UserSettingsService);

  /**
   * Lấy tất cả user settings (Admin only)
   * GET /api/user-settings
   */
  public getAllUserSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userSettings: UserSettings[] = await this.userSettingsService.findAllUserSettings();

      res.status(200).json({
        message: 'Retrieved all user settings successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Lấy user settings theo ID
   * GET /api/user-settings/:id
   */
  public getUserSettingsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const settingsId = req.params.id;
      const userSettings: UserSettings = await this.userSettingsService.findUserSettingsById(settingsId);

      res.status(200).json({
        message: 'User settings retrieved successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Lấy user settings của user hiện tại
   * GET /api/user-settings/me
   */
  public getMyUserSettings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const userSettings: UserSettings = await this.userSettingsService.findUserSettingsByUserId(userId);

      res.status(200).json({
        message: 'Your settings retrieved successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Lấy user settings theo userId
   * GET /api/user-settings/user/:userId
   */
  public getUserSettingsByUserId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
      const requestingUserId = req.user.id;

      // Chỉ admin hoặc chính user đó mới có thể xem
      if (requestingUserId !== userId && req.user.role !== 'admin') {
        throw new HttpException(403, 'Access denied');
      }

      const userSettings: UserSettings = await this.userSettingsService.findUserSettingsByUserId(userId);

      res.status(200).json({
        message: 'User settings retrieved successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Tạo user settings mới
   * POST /api/user-settings
   */
  public createUserSettings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const settingsData: CreateUserSettingsDto = req.body;
      const requestingUserId = req.user.id;

      // Chỉ admin hoặc chính user đó mới có thể tạo
      if (requestingUserId !== settingsData.userId && req.user.role !== 'admin') {
        throw new HttpException(403, 'Access denied');
      }

      const userSettings: UserSettings = await this.userSettingsService.createUserSettings(settingsData);

      res.status(201).json({
        message: 'User settings created successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Cập nhật user settings theo ID
   * PUT /api/user-settings/:id
   */
  public updateUserSettings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const settingsId = req.params.id;
      const settingsData: UpdateUserSettingsDto = req.body;

      // Kiểm tra quyền truy cập
      const existingSettings = await this.userSettingsService.findUserSettingsById(settingsId);
      const requestingUserId = req.user.id;

      if (requestingUserId !== existingSettings.userId && req.user.role !== 'admin') {
        throw new HttpException(403, 'Access denied');
      }

      const userSettings: UserSettings = await this.userSettingsService.updateUserSettings(settingsId, settingsData);

      res.status(200).json({
        message: 'User settings updated successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Cập nhật user settings của user hiện tại
   * PUT /api/user-settings/me
   */
  public updateMyUserSettings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const settingsData: UpdateUserSettingsDto = req.body;
      const userSettings: UserSettings = await this.userSettingsService.updateUserSettingsByUserId(userId, settingsData);

      res.status(200).json({
        message: 'Your settings updated successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Cập nhật user settings theo userId
   * PUT /api/user-settings/user/:userId
   */
  public updateUserSettingsByUserId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
      const requestingUserId = req.user.id;
      const settingsData: UpdateUserSettingsDto = req.body;

      // Chỉ admin hoặc chính user đó mới có thể cập nhật
      if (requestingUserId !== userId && req.user.role !== 'admin') {
        throw new HttpException(403, 'Access denied');
      }

      const userSettings: UserSettings = await this.userSettingsService.updateUserSettingsByUserId(userId, settingsData);

      res.status(200).json({
        message: 'User settings updated successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Xóa user settings
   * DELETE /api/user-settings/:id
   */
  public deleteUserSettings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const settingsId = req.params.id;

      // Kiểm tra quyền truy cập
      const existingSettings = await this.userSettingsService.findUserSettingsById(settingsId);
      const requestingUserId = req.user.id;

      if (requestingUserId !== existingSettings.userId && req.user.role !== 'admin') {
        throw new HttpException(403, 'Access denied');
      }

      const userSettings: UserSettings = await this.userSettingsService.deleteUserSettings(settingsId);

      res.status(200).json({
        message: 'User settings deleted successfully',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Reset user settings về default
   * POST /api/user-settings/reset
   */
  public resetMyUserSettings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const userSettings: UserSettings = await this.userSettingsService.resetUserSettings(userId);

      res.status(200).json({
        message: 'Your settings have been reset to default',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Reset user settings theo userId (Admin only)
   * POST /api/user-settings/reset/:userId
   */
  public resetUserSettings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;

      // Chỉ admin mới có thể reset settings của user khác
      if (req.user.role !== 'admin') {
        throw new HttpException(403, 'Access denied. Admin only.');
      }

      const userSettings: UserSettings = await this.userSettingsService.resetUserSettings(userId);

      res.status(200).json({
        message: 'User settings have been reset to default',
        data: userSettings,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Kiểm tra user có thể nhận email không
   * GET /api/user-settings/check/email/:userId
   */
  public checkCanReceiveEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
      const canReceive = await this.userSettingsService.canReceiveEmail(userId);

      res.status(200).json({
        message: 'Email preference checked',
        data: { canReceiveEmail: canReceive },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Kiểm tra user có thể nhận push notification không
   * GET /api/user-settings/check/push/:userId
   */
  public checkCanReceivePush = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
      const canReceive = await this.userSettingsService.canReceivePush(userId);

      res.status(200).json({
        message: 'Push notification preference checked',
        data: { canReceivePush: canReceive },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Bulk update settings cho nhiều users (Admin only)
   * PUT /api/user-settings/bulk
   */
  public bulkUpdateSettings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user.role !== 'admin') {
        throw new HttpException(403, 'Access denied. Admin only.');
      }

      const { userIds, settings }: { userIds: string[]; settings: UpdateUserSettingsDto } = req.body;

      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        throw new HttpException(400, 'User IDs array is required');
      }

      const results = await this.userSettingsService.bulkUpdateSettings(userIds, settings);

      res.status(200).json({
        message: 'Bulk update completed',
        data: results,
      });
    } catch (error) {
      next(error);
    }
  };
}
