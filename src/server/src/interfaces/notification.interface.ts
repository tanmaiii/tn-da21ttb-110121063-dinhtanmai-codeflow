import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';

export interface Notification {
  id?: string;
  type: ENUM_TYPE_NOTIFICATION;
  title: string;
  message: string;
  userId?: string;
  authorId?: string;
  topicId?: string;
  courseId?: string;
  postId?: string;
  reposId?: string;
  isRead?: boolean;
  link: string;
}
