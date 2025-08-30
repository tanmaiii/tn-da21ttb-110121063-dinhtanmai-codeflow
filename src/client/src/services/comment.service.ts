import { IComment, ICommentSimple, ICreatoeCmmentDto } from '@/interfaces/comment';
import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class CommentService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('comments');
  }

  async getAll(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<ICommentSimple[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async create(data: ICreatoeCmmentDto): Promise<ResponseAPIDto<IComment>> {
    const res = await this.client.post('/', data);
    return res.data;
  }

  async update(id: string, data: ICreatoeCmmentDto): Promise<ResponseAPIDto<IComment>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async updateStatus(id: string, status: boolean) {
    const res = await this.client.put(`/${id}`, { status });
    return res.data;
  }

  async delete(id: string) {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }

  async destroy(id: string) {
    const res = await this.client.delete(`/${id}/force`);
    return res.data;
  }

  async restore(id: string) {
    const res = await this.client.put(`/${id}/restore`);
    return res.data;
  }
}

export default new CommentService() as CommentService;
