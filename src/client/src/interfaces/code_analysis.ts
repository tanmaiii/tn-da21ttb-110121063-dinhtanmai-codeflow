import { IBaseEntity, IGetAllQuery } from './common';
import { IUser } from './user';

export interface ICodeAnalysis extends IBaseEntity {
  id: string;
  reposId: string;
  branch: string;
  commitSha: string;
  status: string;
  analyzedAt: Date;
  workflowRunId: string;
  authorId: string;
  author?: IUser;
  metrics: IMetrics[];
}

export interface IMetrics extends IBaseEntity {
  id: string;
  codeAnalysisId: string;
  name: string;
  value: number;
  bestValue?: boolean;
}

export interface ICodeAnalysisQueryParams extends IGetAllQuery {
  authorId?: string;
}

export interface ITopicMetrics {
  name: string;
  value: number;
  bestValue?: boolean;
}
