import { Course } from './courses.interface';
import { Repos } from './repos.interface';
import { User } from './users.interface';
import { IUser } from '../../../client/src/interfaces/user';
export interface Topic {
  id: string;
  title: string;
  description: string;
  courseId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
  groupName: string;
  course?: Course;
  members?: TopicMember[];
  author?: User;
  repos?: Repos[];
  // Stats fields
  memberCount?: number;
  reposCount?: number;
  // Legacy fields for backward compatibility
  commitsCount?: number;
  pullRequestsCount?: number;
  codeAnalysisCount?: number;
  // New detailed stats
  commit?: {
    total: number;
    additions: number;
    deletions: number;
  };
  pullRequest?: {
    total: number;
    additions: number;
    deletions: number;
    open: number;
    closed: number;
    merged: number;
  };
  codeAnalysis?: {
    total: number;
    success: number;
    failure: number;
  };
  activityScore?: number;
}

export interface TopicMember {
  id: string;
  topicId: string;
  userId: string;
  role: string;
  user?: User;
}

export interface TopicEvaluations {
  id: string;
  topicId: string;
  userId: string;
  evaluation: string;
}

export interface TopicCreate {
  title: string;
  description: string;
  courseId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
  groupName: string;
  members?: Array<string>;
  tags?: Array<string>;
}

export interface TopicStats {
  topicId: string;
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
