import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import {
  ITopicEvaluation,
  ITopicEvaluationCreateDto,
  ITopicEvaluationUpdateDto,
} from '@/interfaces/topic';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class TopicEvaluationService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('evaluations');
  }

  async create(
    data: ITopicEvaluationCreateDto,
  ): Promise<ResponseAPIDto<ITopicEvaluationCreateDto>> {
    const res = await this.client.post(`/`, data);
    return res.data;
  }

  async update(
    id: string,
    data: ITopicEvaluationUpdateDto,
  ): Promise<ResponseAPIDto<ITopicEvaluation>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<ITopicEvaluation>> {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }

  async getAllByTopicId(
    topicId: string,
    query: IGetAllQuery,
  ): Promise<PaginatedResponseAPIDto<ITopicEvaluation[]>> {
    const res = await this.client.get(`/${topicId}/topic`, { params: query });
    return res.data;
  }
}

export default new TopicEvaluationService() as TopicEvaluationService;
