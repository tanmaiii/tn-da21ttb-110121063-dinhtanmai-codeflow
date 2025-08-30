import { IComment } from '@/interfaces/comment';
import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import {
  ICodeActivity,
  ICourse,
  ICourseEnrollment,
  ICourseMembers,
  ICreateCourseDto,
} from '@/interfaces/course';
import { ITopicStatus } from '@/interfaces/topic';
import { IMemberContributors } from '@/interfaces/user';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

interface IGetCourseAllQuery extends IGetAllQuery {
  type?: string;
}
class CourseService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('courses');
  }

  async getAll(params: IGetCourseAllQuery): Promise<PaginatedResponseAPIDto<ICourse[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async getAllRegistered(params: IGetCourseAllQuery): Promise<PaginatedResponseAPIDto<ICourse[]>> {
    const res = await this.client.get('/registered', { params });
    return res.data;
  }

  async getAllByUser(
    id: string,
    params: IGetCourseAllQuery,
  ): Promise<PaginatedResponseAPIDto<ICourse[]>> {
    const res = await this.client.get(`/${id}/user`, { params });
    return res.data;
  }

  async getAllByTag(
    params: IGetCourseAllQuery,
    tagId: string,
  ): Promise<PaginatedResponseAPIDto<ICourse[]>> {
    const res = await this.client.get(`/tag/${tagId}`, { params });
    return res.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<ICourse>> {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async create(data: ICreateCourseDto): Promise<ResponseAPIDto<ICourse>> {
    const res = await this.client.post('/', data);
    return res.data;
  }

  async update(id: string, data: ICreateCourseDto): Promise<ResponseAPIDto<ICourse>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<ICourse>> {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }

  async destroy(id: string): Promise<ResponseAPIDto<ICourse>> {
    const res = await this.client.delete(`/${id}/force`);
    return res.data;
  }

  async restore(id: string): Promise<ResponseAPIDto<ICourse>> {
    const res = await this.client.post(`/${id}/restore`);
    return res.data;
  }

  async joinCourse(
    courseId: string,
    password?: string,
  ): Promise<ResponseAPIDto<ICourseEnrollment>> {
    const res = await this.client.post(`/${courseId}/join`, { password });
    return res.data;
  }

  async addMember(courseId: string, memberId: string): Promise<ResponseAPIDto<ICourseEnrollment>> {
    const res = await this.client.post(`/${courseId}/members`, { memberId });
    return res.data;
  }

  async removeMember(
    courseId: string,
    memberId: string,
  ): Promise<ResponseAPIDto<ICourseEnrollment>> {
    const res = await this.client.delete(`/${courseId}/members/${memberId}`);
    return res.data;
  }

  async checkJoinCourse(courseId: string, userId?: string): Promise<ResponseAPIDto<boolean>> {
    const res = await this.client.get(`/${courseId}/check${userId ? `/${userId}` : ''}`);
    return res.data;
  }

  async memberInCourse(
    courseId: string,
    params: IGetAllQuery,
  ): Promise<PaginatedResponseAPIDto<ICourseMembers[]>> {
    const res = await this.client.get(`/${courseId}/members`, { params });
    return res.data;
  }

  async comments(id: string): Promise<ResponseAPIDto<IComment[]>> {
    const res = await this.client.get(`/${id}/comments`);
    return res.data;
  }

  async getCodeActivity(
    courseId: string,
    days: number = 7,
  ): Promise<ResponseAPIDto<ICodeActivity>> {
    const res = await this.client.get(`/${courseId}/code-activity`, {
      params: { days },
    });
    return res.data;
  }

  async getContributors(
    courseId: string,
    params: IGetAllQuery,
  ): Promise<PaginatedResponseAPIDto<IMemberContributors[]>> {
    const res = await this.client.get(`/${courseId}/contributors`, { params });
    return res.data;
  }

  async getTopicStatus(courseId: string): Promise<ResponseAPIDto<ITopicStatus>> {
    const res = await this.client.get(`/${courseId}/topic-status`);
    return res.data;
  }
}

export default new CourseService() as CourseService;
