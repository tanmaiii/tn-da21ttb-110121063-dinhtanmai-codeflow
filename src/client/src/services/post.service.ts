import { IComment } from '@/interfaces/comment';
import { IGetAllQuery, ResponseAPIDto, PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICreatePostDto, IPost } from '@/interfaces/post';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class PostService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('posts');
  }

  async getAll(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<IPost[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async getAllByTag(params: IGetAllQuery, tagId: string): Promise<PaginatedResponseAPIDto<IPost[]>> {
    const res = await this.client.get(`/tag/${tagId}`, { params });
    return res.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async getAllByUser(params: IGetAllQuery, userId: string): Promise<PaginatedResponseAPIDto<IPost[]>> {
    const res = await this.client.get(`/${userId}/user`, { params });
    return res.data;
  }

  async create(data: ICreatePostDto): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.post('/', data);
    return res.data;
  }

  async update(id: string, data: ICreatePostDto): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }

  async destroy(id: string): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.delete(`/${id}/force`);
    return res.data;
  }

  async restore(id: string): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.put(`/${id}/restore`);
    return res.data;
  }

  async updateStatus(id: string, status: boolean): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.put(`/${id}`, { status });
    return res.data;
  }

  async checkLike(id: string): Promise<ResponseAPIDto<{ isLike: boolean }>> {
    const res = await this.client.get(`/${id}/like`);
    return res.data;
  }

  async like(id: string): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.post(`/${id}/like`);
    return res.data;
  }

  async unlike(id: string): Promise<ResponseAPIDto<IPost>> {
    const res = await this.client.delete(`/${id}/like`);
    return res.data;
  }

  async comments(id: string): Promise<ResponseAPIDto<IComment[]>> {
    const res = await this.client.get(`/${id}/comments`);
    return res.data;
  }
}

export default new PostService() as PostService;
