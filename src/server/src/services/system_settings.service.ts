import { SystemSettings } from '@/interfaces/system_settings.interface';
import { DB } from '@database';
import { HttpException } from '@exceptions/HttpException';
import { Service } from 'typedi';

@Service()
export class SystemSettingsService {
  public async findAllSettings(): Promise<SystemSettings[]> {
    const allSettings: SystemSettings[] = await DB.SystemSettings.findAll();
    return allSettings;
  }

  public async findSettingByKey(key: string): Promise<SystemSettings> {
    const findSetting: SystemSettings = await DB.SystemSettings.findOne({
      where: { key },
    });
    if (!findSetting) throw new HttpException(409, "Setting doesn't exist");

    return findSetting;
  }

  public async createSetting(settingData: Partial<SystemSettings>): Promise<SystemSettings> {
    const findSetting: SystemSettings = await DB.SystemSettings.findOne({
      where: { key: settingData.key },
    });
    if (findSetting) throw new HttpException(409, `Setting with key ${settingData.key} already exists`);

    const createSettingData: SystemSettings = await DB.SystemSettings.create({
      ...settingData,
    });
    return createSettingData;
  }

  public async updateSetting(key: string, settingData: Partial<SystemSettings>): Promise<SystemSettings> {
    const findSetting: SystemSettings = await DB.SystemSettings.findOne({
      where: { key },
    });
    if (!findSetting) throw new HttpException(409, "Setting doesn't exist");

    await DB.SystemSettings.update(settingData, { where: { key } });

    const updateSetting: SystemSettings = await DB.SystemSettings.findOne({
      where: { key },
    });
    return updateSetting;
  }

  public async deleteSetting(key: string): Promise<SystemSettings> {
    const findSetting: SystemSettings = await DB.SystemSettings.findOne({
      where: { key },
    });
    if (!findSetting) throw new HttpException(409, "Setting doesn't exist");

    await DB.SystemSettings.destroy({ where: { key } });
    return findSetting;
  }

  // Helper methods for specific setting types
  public async getSettingValue(key: string): Promise<any> {
    const setting = await this.findSettingByKey(key);

    switch (setting.type) {
      case 'json':
        return JSON.parse(setting.value);
      case 'number':
        return Number(setting.value);
      case 'boolean':
        return setting.value === 'true';
      default:
        return setting.value;
    }
  }

  public async setSettingValue(key: string, value: any, type: string): Promise<SystemSettings> {
    let stringValue: string;

    switch (type) {
      case 'json':
        stringValue = JSON.stringify(value);
        break;
      case 'number':
      case 'boolean':
        stringValue = String(value);
        break;
      default:
        stringValue = value;
    }

    try {
      return await this.updateSetting(key, { value: stringValue, type });
    } catch (error) {
      // If setting doesn't exist, create it
      return await this.createSetting({ key, value: stringValue, type });
    }
  }
}
