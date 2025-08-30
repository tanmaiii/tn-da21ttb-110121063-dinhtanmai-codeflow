import createHttpClient from '@/lib/createHttpClient';
import { IGetAllQuery, ResponseAPIDto, PaginatedResponseAPIDto } from '@/interfaces/common';
import { AxiosInstance } from 'axios';
import { IGetUserAllQuery, IUser, IUserCreate, IUserSetting } from '@/interfaces/user';

class UserService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('users');
  }

  async getAll(params: IGetUserAllQuery): Promise<PaginatedResponseAPIDto<IUser[]>> {
    const res = await this.client.get('', { params });
    return res.data;
  }

  async getAllStudent(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<IUser[]>> {
    const res = await this.client.get('/student', { params });
    return res.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<IUserSetting>> {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async getMe(): Promise<ResponseAPIDto<IUser>> {
    const res = await this.client.get('/me');
    return res.data;
  }

  async create(data: IUserCreate): Promise<ResponseAPIDto<IUser>> {
    const res = await this.client.post('', data);
    return res.data;
  }

  async update(id: string, data: IUser): Promise<ResponseAPIDto<IUser>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<IUser>> {
    const res = await this.client.put(`/${id}/delete`);
    return res.data;
  }

  async getOnlineUsers(): Promise<ResponseAPIDto<IUser[]>> {
    const res = await this.client.get('/online');
    return res.data;
  }
}

export default new UserService() as UserService;
