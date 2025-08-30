import { ILogin, ILoginWithGithub, ISignup, LoginResponseDto } from '@/interfaces/auth';
import { ResponseAPIDto } from '@/interfaces/common';
import { IUser } from '@/interfaces/user';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class AuthService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('');
  }

  async login(body: ILogin): Promise<LoginResponseDto> {
    const response = await this.client.post<LoginResponseDto>('/login', body);
    return response.data;
  }

  async signup(body: ISignup) {
    return this.client.post('/signup', body);
  }

  async loginWithGithub(body: ILoginWithGithub): Promise<LoginResponseDto> {
    const res = await this.client.post<LoginResponseDto>('/loginWithGithub', body);
    return res.data;
  }

  async checkJoinOrganization({ token }: { token?: string }): Promise<ResponseAPIDto<IUser>> {
    const res = await this.client.get('/checkJoinOrganization', {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return res.data;
  }

  async getInfoUser({ token }: { token?: string }): Promise<ResponseAPIDto<IUser>> {
    const res = await this.client.get('/info', {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return res.data;
  }

  async logout() {
    const res = await this.client.post('/logout');
    return res.data;
  }

  async forgotPassword(body: { email: string }): Promise<ResponseAPIDto<{ message: string }>> {
    const res = await this.client.post('/forgot-password', body);
    return res.data;
  }

  async resetPassword(body: { token: string; newPassword: string }): Promise<ResponseAPIDto<{ message: string }>> {
    const res = await this.client.post('/reset-password', body);
    return res.data;
  }

  async changePassword(body: { currentPassword: string; newPassword: string }): Promise<ResponseAPIDto<{ message: string }>> {
    const res = await this.client.post('/change-password', body);
    return res.data;
  }
}

export default new AuthService() as AuthService;
