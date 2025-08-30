import { AxiosInstance } from 'axios';
import createHttpClient from '@/lib/createHttpClient';
import { ResponseAPIDto } from '@/interfaces/common';
import { IUserSettings } from '@/interfaces/user';

class SettingsService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('user-settings');
  }

  public async getMe(): Promise<ResponseAPIDto<IUserSettings>> {
    const res = await this.client.get('/me');
    return res.data;
  }

  public async updateMe(data: IUserSettings): Promise<ResponseAPIDto<IUserSettings>> {
    const res = await this.client.put('/me', data);
    return res.data;
  }

  public async resetMe(): Promise<ResponseAPIDto<IUserSettings>> {
    const res = await this.client.post('/reset');
    return res.data;
  }

  public async checkCanReceiveEmail(userId: string): Promise<ResponseAPIDto<boolean>> {
    const res = await this.client.get(`/check/email/${userId}`);
    return res.data;
  }
}

export default new SettingsService() as SettingsService;
