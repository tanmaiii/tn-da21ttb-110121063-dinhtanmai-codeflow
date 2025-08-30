import { IBaseEntity, IGetAllQuery } from './common';
import { IReviewAI } from './reviews_ai';
import { ITopic } from './topic';
import { IUser } from './user';

export interface IRepos extends IBaseEntity {
  id: string;
  name: string;
  topicId: string;
  url: string;
  authorId: string;
  courseId: string;
  author: IUser;
  language: string;
  framework: string;
  topic: ITopic;
}

export interface IReposStats {
  commit: {
    total: number;
    additions: number;
    deletions: number;
  };
  pullRequest: {
    total: number;
    additions: number;
    deletions: number;
    open: number;
    closed: number;
    merged: number;
  };
  codeAnalysis: {
    total: number;
    success: number;
    failure: number;
  };
}

export interface IReposCreateDto {
  name: string;
  topicId: string;
  language: string;
  framework: string;
}

export interface IReposUpdateDto {
  name: string;
  language: string;
  topicId: string;
  framework: string;
}

export interface ICommit extends IBaseEntity {
  id: string;
  reposId: string;
  commitSha: string;
  message: string;
  authorId: string;
  additions: number;
  deletions: number;
  totalChanges: number;
  isMerged: boolean;
  author: IUser;
  branch?: string;
}

export interface IPullRequest extends IBaseEntity {
  id: string;
  reposId: string;
  pullNumber: number;
  title: string;
  body: string;
  authorId: string;
  headBranch: string; // Nhánh đẩy lên
  baseBranch: string; // Nhánh cần merge
  commitCount: number;
  additions: number; // dòng thêm
  deletions: number; // dòng xóa
  status: 'open' | 'closed' | 'merged';
  mergedAt?: Date;
  closedAt?: Date;
  author: IUser;
  reviewsAI?: IReviewAI[];
}

export interface IPullRequestQueryParams extends IGetAllQuery {
  authorId?: string;
}

export interface ICommitQueryParams extends IGetAllQuery {
  authorId?: string;
}


export interface IReposFramework {
  framework: string;
  count: number;
}