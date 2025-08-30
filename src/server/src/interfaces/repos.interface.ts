export interface Repos {
  id: string;
  name: string;
  url: string;
  courseId: string;
  topicId: string;
  authorId: string;
  language: string;
  framework: string;
  sonarKey: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ReposStats {
  reposId: string;
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

export interface RepoCreate {
  name: string;
  topicId: string;
  authorId: string;
  language: string;
  framework: string;
}

export interface RepoUpdate {
  topicId: string;
  name: string;
  url: string;
  language: string;
  framework: string;
}

export interface ReposStatusStats {
  status: Array<{
    status: string;
    count: number;
  }>;
  language: Array<{
    language: string;
    count: number;
  }>;
  framework: Array<{
    framework: string;
    count: number;
  }>;
  total: number;
  active: number;
  inactive: number;
}
