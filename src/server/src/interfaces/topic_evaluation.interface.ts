import { User } from './users.interface';

export interface TopicEvaluation {
  id: number;
  topicId: number;
  userId: number;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface CreateTopicEvaluationDto {
  content: string;
  rating: number;
}

export interface UpdateTopicEvaluationDto {
  content: string;
  rating: number;
}
