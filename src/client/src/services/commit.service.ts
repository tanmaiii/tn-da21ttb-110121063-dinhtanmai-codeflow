import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICommit } from '@/interfaces/repos';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class CommitService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('commits');
  }

  async getByReposId(
    params: IGetAllQuery,
    reposId: string,
  ): Promise<PaginatedResponseAPIDto<ICommit[]>> {
    const res = await this.client.get(`/repos/${reposId}`, { params });
    return res.data;
  }
}

export default new CommitService() as CommitService;
