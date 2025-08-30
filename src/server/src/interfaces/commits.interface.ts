export interface Commits {
  id: string;
  reposId: string;
  commitSha: string;
  message: string;
  authorId: string;
  additions: number;
  deletions: number;
  totalChanges: number;
  isMerged: boolean;
  branch: string;
}

export interface CommitCreate {
  reposId: string;
  commitSha: string;
  message: string;
  authorId: string;
  additions: number;
  deletions: number;
  totalChanges: number;
  isMerged: boolean;
  branch: string;
}

export interface CommitUpdate {
  reposId: string;
  commitSha: string;
  message: string;
  authorId: string;
  additions: number;
  deletions: number;
  totalChanges: number;
  isMerged: boolean;
  branch: string;
}
