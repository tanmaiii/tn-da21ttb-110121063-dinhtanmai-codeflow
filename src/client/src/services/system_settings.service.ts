import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';
import { IBaseEntity, ResponseAPIDto } from '@/interfaces/common';

interface ISystemSettings extends IBaseEntity {
    key: string;
    value: string;
    type: string;
}

interface UpdateSystemSettingDto {
  value?: string;
  type?: string;
}

interface SetSettingValueDto {
  value: string | number | boolean | object;
  type?: string;
}

class SystemSettingsService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('system-settings');
  }

  public async getSettings(): Promise<ResponseAPIDto<ISystemSettings[]>> {
    const res = await this.client.get('/');
    return res.data;
  }

  public async getSettingByKey(key: string): Promise<ResponseAPIDto<ISystemSettings>> {
    const res = await this.client.get(`/${key}`);
    return res.data;
  }

  public async updateSetting(key: string, data: UpdateSystemSettingDto): Promise<ResponseAPIDto<ISystemSettings>> {
    const res = await this.client.put(`/${key}`, data);
    return res.data;
  }

  public async setSettingValue(key: string, data: SetSettingValueDto): Promise<ResponseAPIDto<ISystemSettings>> {
    const res = await this.client.put(`/${key}/value`, data);
    return res.data;
  }
}

export default new SystemSettingsService() as SystemSettingsService;
