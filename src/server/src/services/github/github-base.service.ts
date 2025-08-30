import { logger } from '@utils/logger';
import axios, { AxiosRequestConfig } from 'axios';
import { env } from 'process';

export abstract class GitHubBaseService {
  protected readonly baseUrl = 'https://api.github.com';
  protected readonly organization = process.env.GITHUB_ORGANIZATION || 'organization-codeflow';

  protected readonly headers = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  };

  protected readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  /**
   * Thực hiện HTTP request với error handling chung
   */
  protected async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios({
        ...config,
        headers: {
          ...this.headers,
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      this.logError(`Error in ${config.method?.toUpperCase()} ${config.url}`, error);
      throw error;
    }
  }

  /**
   * Log thông tin
   */
  protected logInfo(message: string, data?: any): void {
    logger.info(`[👁️ ${this.serviceName}] ${message}${data ? `: ${JSON.stringify(data)}` : ''}`);
  }

  /**
   * Log lỗi
   */
  protected logError(message: string, error: any): void {
    logger.error(`[🚨 ${this.serviceName}] ${message}: ${error.message}`);
  }

  /**
   * Tạo URL cho organization repository
   */
  protected getOrgRepoUrl(repoName: string): string {
    return `${this.baseUrl}/repos/${this.organization}/${repoName}`;
  }

  /**
   * Tạo URL cho organization
   */
  protected getOrgUrl(): string {
    return `${this.baseUrl}/orgs/${this.organization}`;
  }
}
