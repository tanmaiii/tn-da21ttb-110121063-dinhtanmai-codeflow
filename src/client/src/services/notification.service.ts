import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';
import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import { INotification } from '@/interfaces/notification';

class NotificationService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('notifications');
  }

  async getAll(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<INotification[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async getAllByUser(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<INotification[]>> {
    const res = await this.client.get(`/user`, { params });
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<INotification>> {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }

  async read(id: string, isRead: boolean): Promise<ResponseAPIDto<INotification>> {
    const res = await this.client.put(`/${id}/read`, { isRead });
    return res.data;
  }

  async unread(id: string): Promise<ResponseAPIDto<INotification>> {
    const res = await this.client.put(`/${id}/unread`);
    return res.data;
  }

  async readAll(): Promise<ResponseAPIDto<INotification[]>> {
    const res = await this.client.put(`/read`);
    return res.data;
  }
}

export default new NotificationService() as NotificationService;
