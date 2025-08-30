import { User } from '@/interfaces/users.interface';

// model
export interface Course {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
  authorId: string;
  startDate: Date;
  endDate: Date;
  regStartDate: Date;
  regEndDate: Date;
  topicDeadline: Date;
  status: boolean;
  password: string;
  maxGroupMembers: number;
  type: string;
}

// model
export interface CourseDocument {
  id: string;
  title: string;
  courseId: string;
  url: string;
}

// model
export interface CourseEnrollment {
  courseId: string;
  userId: string;
  status: boolean;
  user?: User;
}

// DTO
export interface CourseCreate {
  title?: string;
  description?: string;
  authorId?: string;
  startDate?: Date;
  endDate?: Date;
  regStartDate?: Date;
  regEndDate?: Date;
  topicDeadline?: Date;
  status?: boolean;
  tags?: Array<string>;
  documents?: Array<string>;
  password?: string;
}
