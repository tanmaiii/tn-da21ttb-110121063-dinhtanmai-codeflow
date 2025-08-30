import { ICodeAnalysis, ITopicMetrics } from '@/interfaces/code_analysis';
import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class CodeAnalysisService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('code-analysis');
  }

  async getAll(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<ICodeAnalysis[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async getByReposId(
    params: IGetAllQuery,
    reposId: string,
  ): Promise<PaginatedResponseAPIDto<ICodeAnalysis[]>> {
    const res = await this.client.get(`/repos/${reposId}`, { params });
    return res.data;
  }

  async getByReposIdWithTimeFilter(
    reposId: string,
    timeframe: string,
  ): Promise<ResponseAPIDto<ICodeAnalysis[]>> {
    const res = await this.client.get(`/repos/${reposId}/timeframe`, {
      params: { timeframe },
    });
    return res.data;
  }

  async getByTopicId(topicId: string): Promise<ResponseAPIDto<ITopicMetrics[]>> {
    const res = await this.client.get(`/topic/${topicId}`);
    return res.data;
  }

  async getByCourseId(courseId: string): Promise<ResponseAPIDto<ITopicMetrics[]>> {
    const res = await this.client.get(`/course/${courseId}`);
    return res.data;
  }
}

export default new CodeAnalysisService() as CodeAnalysisService;
