import { IBaseEntity } from './common';
import { ITag } from './tags';
import { ITopic, ITopicMember } from './topic';
import { IUser } from './user';

export interface IDocument {
  id: string;
  title: string;
  courseId: string;
  url: string;
}

export interface ICourse extends IBaseEntity {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
  authorId: string;
  startDate: string; // ngày bắt đầu khóa học
  endDate: string; // ngày kết thúc khóa học
  regStartDate: string; // ngày bắt đầu đăng ký
  regEndDate: string; // ngày kết thúc đăng ký
  topicDeadline: string; // ngày kết thúc đề tài
  status: boolean;
  maxGroupMembers: number;
  topicCount: number;
  documents?: IDocument[];
  enrollmentCount: number;
  tags?: ITag[];
  author?: IUser;
  type: string;
}

export interface ICourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  status: boolean;
  user?: IUser;
}

export interface ICourseMembers extends IUser {
  topicMembers: (ITopicMember & { topic: ITopic })[];
}

export interface ICreateCourseDto {
  title: string;
  description: string;
  thumbnail?: string;
  startDate?: Date;
  endDate?: Date;
  regStartDate?: Date;
  regEndDate?: Date;
  topicDeadline?: Date;
  documents?: Array<string>;
  tags?: Array<string>;
  maxGroupMembers?: number;
  type?: string;
}

export interface ICodeActivity {
  activities: {
    date: string;
    commits: number;
    pullRequests: number;
    codeAnalysis: number;
  }[];
  totalCommits: number;
  totalPullRequests: number;
  totalCodeAnalysis: number;
}

export interface ICourseType {
  type: string;
  count: number;
}

export interface ICourseStatus{
  registration: number;
  active: number;
  ended: number;
  total: number;
}