import { PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import {
  IGetAllTopicParams,
  ITopic,
  ITopicContributors,
  ITopicCreateDto,
  ITopicDetailStats,
  ITopicStats,
} from '@/interfaces/topic';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class TopicService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('topics');
  }

  async getAll(params: IGetAllTopicParams): Promise<PaginatedResponseAPIDto<ITopic[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async getAllByCourseId(
    params: IGetAllTopicParams,
    courseId: string,
  ): Promise<PaginatedResponseAPIDto<ITopic[]>> {
    const res = await this.client.get(`/${courseId}/course`, { params });
    return res.data;
  }

  async getAllStatsByCourseId(
    params: IGetAllTopicParams,
    courseId: string,
  ): Promise<PaginatedResponseAPIDto<ITopicStats[]>> {
    const res = await this.client.get(`/${courseId}/course/stats`, { params });
    return res.data;
  }

  async getAllByUserId(
    params: IGetAllTopicParams,
    userId: string,
  ): Promise<PaginatedResponseAPIDto<ITopic[]>> {
    const res = await this.client.get(`/${userId}/user`, { params });
    return res.data;
  }

  async getAllByTeacherId(
    params: IGetAllTopicParams,
    userId: string,
  ): Promise<PaginatedResponseAPIDto<ITopic[]>> {
    const res = await this.client.get(`/${userId}/teacher`, { params });
    return res.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async getStats(id: string): Promise<ResponseAPIDto<ITopicDetailStats>> {
    const res = await this.client.get(`/${id}/stats`);
    return res.data;
  }

  public async getContributors(id: string): Promise<ResponseAPIDto<ITopicContributors[]>> {
    const res = await this.client.get(`/${id}/contributors`);
    return res.data;
  }

  async create(data: ITopicCreateDto): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.post('/', data);
    return res.data;
  }

  async update(id: string, data: ITopicCreateDto): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }

  async destroy(id: string): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.delete(`/${id}/force`);
    return res.data;
  }

  async restore(id: string): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.put(`/${id}/restore`);
    return res.data;
  }

  async updateStatus(id: string, status: string): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.put(`/${id}`, { status });
    return res.data;
  }

  // async createEvaluation(
  //   id: string,
  //   data: ITopicEvaluationCreateDto,
  // ): Promise<ResponseAPIDto<ITopicEvaluation>> {
  //   const res = await this.client.post(`/${id}/evaluations`, data);
  //   return res.data;
  // }

  // async updateEvaluation(
  //   topicId: string,
  //   evaluationId: string,
  //   data: ITopicEvaluationUpdateDto,
  // ): Promise<ResponseAPIDto<ITopicEvaluation>> {
  //   const res = await this.client.put(`/${topicId}/evaluations/${evaluationId}`, data);
  //   return res.data;
  // }

  // async deleteEvaluation(
  //   topicId: string,
  //   evaluationId: string,
  // ): Promise<ResponseAPIDto<ITopicEvaluation>> {
  //   const res = await this.client.delete(`/${topicId}/evaluations/${evaluationId}`);
  //   return res.data;
  // }
}

export default new TopicService() as TopicService;
