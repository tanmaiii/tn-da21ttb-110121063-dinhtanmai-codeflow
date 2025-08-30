import { GitHubContributor, GithubMeta, GitHubRepository, GitHubRepositoryCreate } from '@interfaces/github.interface';
import axios from 'axios';
import { Service } from 'typedi';
import { GitHubBaseService } from './github-base.service';

@Service()
export class GitHubRepositoryService extends GitHubBaseService {
  constructor() {
    super('GitHub Repository Service');
  }

  async fetchPRs(state: string, repoName: string, page = 1) {
    const url = `${this.baseUrl}/repos/${this.organization}/${repoName}/pulls?state=${state}&per_page=100&page=${page}`;
    const res = await axios.get(url, { headers: this.headers });
    return res.data;
  }

  /**
   * Tạo repository mới trên GitHub
   * @param repoData Thông tin repository
   * @returns Thông tin repository đã tạo
   */
  public async createRepoInOrg(repoData: Partial<GitHubRepositoryCreate>): Promise<GitHubRepository> {
    this.logInfo('Creating repository', repoData);

    return this.makeRequest<GitHubRepository>({
      method: 'POST',
      url: `${this.getOrgUrl()}/repos`,
      data: repoData,
    });
  }

  public async infoRepo(repoName: string): Promise<GithubMeta> {
    this.logInfo('Getting repository information', { repoName });

    const repository = await this.makeRequest<GitHubRepository>({
      method: 'GET',
      url: this.getOrgRepoUrl(repoName),
    });

    const [totalCommits, pullRequestMetrics, totalIssues] = await Promise.all([
      this.getTotalCommits(repoName),
      this.getPullRequestMetrics(repoName),
      this.getTotalIssues(repoName),
    ]);

    return {
      id: repository.id,
      name: repository.name,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      commits: totalCommits,
      pull_requests_open: pullRequestMetrics.open,
      pull_requests_closed: pullRequestMetrics.closed,
      pull_requests_merged: pullRequestMetrics.merged,
      issues: totalIssues,
      created_at: repository.created_at,
      updated_at: repository.updated_at,
      pushed_at: repository.pushed_at,
    };
  }

  private async getTotalIssues(repoName: string): Promise<number> {
    let page = 1;
    let total = 0;

    while (true) {
      const res = await axios.get(`${this.getOrgRepoUrl(repoName)}/issues?state=all&per_page=100&page=${page}`, {
        headers: this.headers,
      });

      const issues = res.data;

      if (issues.length === 0) break;

      // Lọc bỏ Pull Request (PR luôn có trường `pull_request`)
      const realIssues = issues.filter((issue: any) => !issue.pull_request);
      total += realIssues.length;

      page++;
    }

    return total;
  }

  private async getTotalCommits(repoName: string): Promise<number> {
    try {
      const response = await axios.get(`${this.getOrgRepoUrl(repoName)}/commits?per_page=1`, {
        headers: this.headers,
      });

      const linkHeader = response.headers.link;
      if (!linkHeader) {
        return 1; // Default to 1 if no pagination
      }

      const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
      return lastPageMatch ? parseInt(lastPageMatch[1], 10) : 1;
    } catch (error) {
      this.logError('Error getting total commits', error);
      return 1;
    }
  }

  private async getPullRequestMetrics(repoName: string): Promise<{ open: number; closed: number; merged: number }> {
    const openPRs = await this.fetchPRs('open', repoName);

    let closedCount = 0;
    let mergedCount = 0;
    let page = 1;

    while (true) {
      const closedPRs = await this.fetchPRs('closed', repoName, page);
      if (closedPRs.length === 0) break;

      closedCount += closedPRs.length;
      mergedCount += closedPRs.filter(pr => pr.merged_at).length;
      page++;
    }

    return {
      open: openPRs.length,
      closed: closedCount,
      merged: mergedCount,
    };
  }

  public async getContributors(repoName: string): Promise<GitHubContributor[]> {
    const contributors = await this.makeRequest<GitHubContributor[]>({
      method: 'GET',
      url: `${this.getOrgRepoUrl(repoName)}/contributors?per_page=100`,
    });
    return contributors;
  }

  public async renameBranchMainToMaster(repoName: string): Promise<void> {
    this.logInfo('Renaming branch main to master', { repoName });

    // Đổi main thành master
    await this.makeRequest({
      method: 'POST',
      url: `${this.getOrgRepoUrl(repoName)}/branches/main/rename`,
      data: {
        new_name: 'master',
      },
    });

    // Đặt default branch là master
    await this.makeRequest({
      method: 'PATCH',
      url: this.getOrgRepoUrl(repoName),
      data: {
        default_branch: 'master',
      },
    });
  }

  public async deleteRepoInOrg(repoName: string): Promise<GitHubRepository> {
    this.logInfo('Deleting repository', { repoName });

    return this.makeRequest<GitHubRepository>({
      method: 'DELETE',
      url: this.getOrgRepoUrl(repoName),
    });
  }

  public async updateRepoInOrg(repoName: string, repoData: Partial<GitHubRepositoryCreate>): Promise<GitHubRepository> {
    this.logInfo('Updating repository', { repoName, ...repoData });

    return this.makeRequest<GitHubRepository>({
      method: 'PATCH',
      url: this.getOrgRepoUrl(repoName),
      data: repoData,
    });
  }

  /**
   * Lấy danh sách repository từ GitHub
   * @param username GitHub username
   * @returns Danh sách repository
   */
  public async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    this.logInfo('Getting user repositories', { username });

    return this.makeRequest<GitHubRepository[]>({
      method: 'GET',
      url: `${this.baseUrl}/users/${username}/repos`,
      params: {
        sort: 'updated',
        per_page: 100,
      },
    });
  }

  /**
   * Lấy chi tiết repository từ GitHub
   * @param owner Repository owner
   * @param repo Repository name
   * @returns Chi tiết repository
   */
  public async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    this.logInfo('Getting repository details', { owner, repo });

    return this.makeRequest<GitHubRepository>({
      method: 'GET',
      url: `${this.baseUrl}/repos/${owner}/${repo}`,
    });
  }

  public async collaborateRepo(repoName: string, username: string): Promise<void> {
    this.logInfo('Thêm thành viên vào repository', { repoName, username });

    return this.makeRequest<void>({
      method: 'PUT',
      url: `${this.getOrgRepoUrl(repoName)}/collaborators/${username}`,
      data: {},
    });
  }

  /**
   * Kiểm tra xem repository có tồn tại trong tổ chức hay không
   * @param repoName Tên repository cần kiểm tra
   * @returns true nếu repository tồn tại, false nếu không
   */
  public async checkRepoExists(repoName: string): Promise<boolean> {
    try {
      await this.makeRequest({
        method: 'GET',
        url: this.getOrgRepoUrl(repoName),
      });
      return true;
    } catch (error) {
      // Nếu repository không tồn tại, GitHub API sẽ trả về lỗi 404
      if (error.response && error.response.status === 404) {
        return false;
      }
      // Nếu có lỗi khác, log và coi như repository đã tồn tại để an toàn
      this.logError('Error checking repository existence', error);
      return true;
    }
  }
}
