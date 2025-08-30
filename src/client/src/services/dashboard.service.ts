import { ITopicMetrics } from '@/interfaces/code_analysis';
import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import { ICodeActivity, ICourseStatus, ICourseType } from '@/interfaces/course';
import { IReposFramework } from '@/interfaces/repos';
import { ITagWithUsageCount } from '@/interfaces/tags';
import { ITopicStatus } from '@/interfaces/topic';
import { IMemberContributors } from '@/interfaces/user';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class DashboardService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('dashboard');
  }

  async getCodeActivity(days: number): Promise<ResponseAPIDto<ICodeActivity>> {
    const res = await this.client.get('/code-activity', { params: { days } });
    return res.data;
  }

  async getTags(): Promise<ResponseAPIDto<ITagWithUsageCount[]>> {
    const res = await this.client.get('/tags');
    return res.data;
  }

  async getFramework(): Promise<ResponseAPIDto<IReposFramework[]>> {
    const res = await this.client.get('/framework');
    return res.data;
  }

  async getCourseTypes(): Promise<ResponseAPIDto<ICourseType[]>> {
    const res = await this.client.get('/course-types');
    return res.data;
  }

  async getTopicStatus(): Promise<ResponseAPIDto<ITopicStatus>> {
    const res = await this.client.get('/topic-status');
    return res.data;
  }

  async getCourseStatus(): Promise<ResponseAPIDto<ICourseStatus>> {
    const res = await this.client.get('/course-status');
    return res.data;
  }

  async getCodeAnalysis(): Promise<ResponseAPIDto<ITopicMetrics[]>> {
    const res = await this.client.get('/code-analysis');
    return res.data;
  }

  async getContributors(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<IMemberContributors[]>> {
    const res = await this.client.get('/contributors', { params });
    return res.data;
  }
}

export default new DashboardService() as DashboardService;
