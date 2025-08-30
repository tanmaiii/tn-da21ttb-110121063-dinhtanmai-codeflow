import { IBaseEntity } from './common';

export interface IReviewAI extends IBaseEntity {
  id: string;
  pullRequestId: string;
  authorId: string;
  summany: string;
  score: number;
  comments: string;
}

export interface IReviewAIResponse {
  summary: string;
  score: number;
  comments: {
    file: string;
    line: number;
    comment: string;
  }[];
}
