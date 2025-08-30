import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { IPullRequest, IPullRequestQueryParams } from '@/interfaces/repos';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class PullRequestsService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('pull-requests');
  }

  async getByReposId(
    params: IPullRequestQueryParams,
    reposId: string,
  ): Promise<PaginatedResponseAPIDto<IPullRequest[]>> {
    const res = await this.client.get(`/repos/${reposId}`, { params });
    return res.data;
  }
}

export default new PullRequestsService() as PullRequestsService;
