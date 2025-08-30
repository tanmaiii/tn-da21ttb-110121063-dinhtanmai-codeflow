import { GitHubCommitDetail, GitHubPullRequest, GitHubPullRequestFile, GitHubPullRequestFileContent } from '@/interfaces/github.interface';
import axios from 'axios';
import { Service } from 'typedi';
import { GitHubBaseService } from './github-base.service';

@Service()
export class GitHubDetailsService extends GitHubBaseService {
  constructor() {
    super('GitHubDetailsService');
  }

  /**
   * Lấy chi tiết commit
   * @param repoName Tên repository
   * @param commitSha SHA của commit
   * @returns Chi tiết commit
   */
  public async getCommitDetails(repoName: string, commitSha: string): Promise<GitHubCommitDetail> {
    const commit = await this.makeRequest<GitHubCommitDetail>({
      method: 'GET',
      url: `${this.getOrgRepoUrl(repoName)}/commits/${commitSha}`,
    });

    return commit;
  }

  public async getPullRequestDetails(repoName: string, pullNumber: number): Promise<GitHubPullRequest> {
    const commit = await this.makeRequest<GitHubPullRequest>({
      method: 'GET',
      url: `${this.getOrgRepoUrl(repoName)}/pulls/${pullNumber}`,
    });

    return commit;
  }

  public async getPullRequestFiles(repoName: string, pullNumber: number): Promise<GitHubPullRequestFile[]> {
    const files = await this.makeRequest<GitHubPullRequestFile[]>({
      method: 'GET',
      url: `${this.getOrgRepoUrl(repoName)}/pulls/${pullNumber}/files`,
    });

    return files;
  }

  public async readFile(repoName: string, path: string, ref: string): Promise<GitHubPullRequestFileContent> {
    const commit = await this.makeRequest<GitHubPullRequestFileContent>({
      method: 'GET',
      url: `${this.getOrgRepoUrl(repoName)}/contents/${path}?ref=${ref}`,
    });

    return commit;
  }

  public async commentPullRequest(repoName: string, pullNumber: number, comment: string, commitId: string, path: string, line: number): Promise<any> {
    try {
      const result = await this.makeRequest<any>({
        method: 'POST',
        url: `${this.getOrgRepoUrl(repoName)}/pulls/${pullNumber}/comments`,
        data: {
          body: comment,
          commit_id: commitId,
          path: path,
          side: 'RIGHT',
          line: line,
        },
      });

      return result;
    } catch (error: any) {
      // Xử lý các loại lỗi cụ thể từ GitHub API
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        switch (status) {
          case 401:
            throw new Error('Unauthorized: Invalid GitHub token or insufficient permissions');
          case 403:
            throw new Error('Forbidden: Rate limit exceeded or insufficient repository permissions');
          case 404:
            throw new Error('Not found: Repository, pull request, or commit not found');
          case 422:
            throw new Error(`Validation failed: ${errorData.message || 'Invalid request parameters'}`);
          default:
            throw new Error(`GitHub API error (${status}): ${errorData.message || 'Unknown error'}`);
        }
      }

      // Lỗi kết nối hoặc lỗi khác
      throw new Error(`Network error: ${error.message}`);
    }
  }
}
