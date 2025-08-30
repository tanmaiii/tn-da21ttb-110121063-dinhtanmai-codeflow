export interface PullRequests {
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
}

export interface PullRequestsCreate {
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
}

export interface PullRequestsUpdate {
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
}
