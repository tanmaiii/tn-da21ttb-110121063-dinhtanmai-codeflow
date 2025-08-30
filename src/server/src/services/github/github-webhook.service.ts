import crypto from 'crypto';
import { stringify } from 'querystring';
import { Service } from 'typedi';
import { GitHubBaseService } from './github-base.service';

@Service()
export class GitHubWebhookService extends GitHubBaseService {
  constructor() {
    super('GitHub Webhook Service');
  }

  public async verifyWebhookSignature(signature: string): Promise<boolean> {
    try {
      this.logInfo('Verifying webhook signature', { signature });

      const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
      hmac.update(signature);
      const calculatedSignature = hmac.digest('hex');
      return calculatedSignature === signature;
    } catch (error) {
      this.logError('Error verifying webhook signature', error);
      throw error;
    }
  }

  /**
   * Lấy danh sách webhooks của repository
   * @param repoName Tên repository
   * @returns Danh sách webhooks
   */
  public async getWebhooks(repoName: string) {
    try {
      this.logInfo('Getting webhooks', { repoName });

      const response = await this.makeRequest({
        method: 'GET',
        url: `${this.getOrgRepoUrl(repoName)}/hooks`,
      });

      return response;
    } catch (error) {
      this.logError(`Error getting webhooks for repo: ${repoName}`, error);
      throw error.response?.data || error;
    }
  }

  /**
   * Xóa webhook theo ID
   * @param repoName Tên repository
   * @param hookId ID của webhook
   * @returns
   */
  public async deleteWebhook(repoName: string, hookId: number) {
    try {
      this.logInfo('Deleting webhook', { repoName, hookId });

      const response = await this.makeRequest({
        method: 'DELETE',
        url: `${this.getOrgRepoUrl(repoName)}/hooks/${hookId}`,
      });

      return response;
    } catch (error) {
      this.logError(`Error deleting webhook: ${hookId}`, error);
      throw error.response?.data || error;
    }
  }

  /**
   * Kiểm tra và xóa tất cả webhooks nếu tồn tại
   * @param repoName Tên repository
   * @returns
   */
  public async checkAndDeleteExistingWebhook(repoName: string) {
    try {
      this.logInfo('Checking and deleting existing webhooks', { repoName });

      // Lấy danh sách webhooks hiện có
      const webhooks = await this.getWebhooks(repoName);

      if (!webhooks || !Array.isArray(webhooks) || webhooks.length === 0) {
        this.logInfo('No webhooks found', { repoName });
        return { deleted: false, message: 'No webhooks found', deletedCount: 0 };
      }

      // Xóa tất cả webhooks hiện có
      const deletedWebhooks = [];
      for (const webhook of webhooks) {
        try {
          this.logInfo('Deleting webhook', {
            repoName,
            webhookId: webhook.id,
            webhookUrl: webhook.config?.url,
          });

          await this.deleteWebhook(repoName, webhook.id);
          deletedWebhooks.push({
            id: webhook.id,
            url: webhook.config?.url,
          });
        } catch (error) {
          this.logError(`Failed to delete webhook ${webhook.id}`, error);
        }
      }

      if (deletedWebhooks.length > 0) {
        return {
          deleted: true,
          message: `Successfully deleted ${deletedWebhooks.length} webhook(s)`,
          deletedCount: deletedWebhooks.length,
          deletedWebhooks,
        };
      } else {
        return {
          deleted: false,
          message: 'Failed to delete any webhooks',
          deletedCount: 0,
        };
      }
    } catch (error) {
      this.logError('Error checking and deleting existing webhooks', error);
      throw error;
    }
  }

  /**
   * Tạo webhook commit trên repository
   * @param repoName Tên repository
   * @param webhookUrl URL của webhook
   * @returns Webhook đã tạo
   */
  public async createWebhookCommit(repoName: string, webhookUrl: string) {
    try {
      this.logInfo('Creating webhook commit', { repoName, webhookUrl });

      const response = await this.makeRequest({
        method: 'POST',
        url: `${this.getOrgRepoUrl(repoName)}/hooks`,
        data: {
          name: 'web',
          active: true,
          events: ['push', 'workflow_run', 'pull_request'],
          config: {
            url: webhookUrl,
            content_type: 'json',
            secret: process.env.GITHUB_WEBHOOK_SECRET,
            insecure_ssl: '0',
          },
        },
      });

      return response;
    } catch (error) {
      this.logError(`Error creating webhook commit: ${webhookUrl}`, error);
      this.logError(`Error creating webhook commit details: ${stringify(error.response?.data)}`, error);
      throw error.response?.data || error;
    }
  }

  /**
   * Xử lý webhook commit
   * @param body
   * @param signature
   * @returns
   */
  public async handleWebhookCommit(body: any, signature: string): Promise<void> {
    try {
      this.logInfo('Handling webhook commit', { signature });
      // Implement webhook handling logic here
    } catch (error) {
      this.logError('Error handling webhook commit', error);
      throw error;
    }
  }
}
