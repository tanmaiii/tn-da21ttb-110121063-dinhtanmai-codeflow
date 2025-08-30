import { propertiesTemplates, workflowTemplates } from '@/templates/workflow';
import { workflowProperties } from '@/templates/workflow/workflow_properties';
import { readmeTemplate } from '@/templates/readme.templates';
import Container, { Service } from 'typedi';
import { SonarService } from '../sonar.service';
import { GitHubContentService } from './github-content.service';
import { GitHubBaseService } from './github-base.service';

@Service()
export class GitHubWorkflowService extends GitHubBaseService {
  private readonly sonarService = Container.get(SonarService);
  private readonly contentService = Container.get(GitHubContentService);

  constructor() {
    super('GitHub Workflow Service');
  }

  /**
   * Tạo workflow cơ bản cho CI/CD
   * @param repoName Tên repository
   * @param language Ngôn ngữ lập trình chính của repository
   * @param framework Framework của repository
   * @returns Thông tin commit đã tạo
   */
  public async createBasicWorkflow(repoName: string, language: string, framework: string, sonarKey: string): Promise<any> {
    this.logInfo('Creating basic workflow', { repoName, language, framework });

    let workflowContent = '';
    let workflowPropertiesContent = '';

    workflowContent = workflowTemplates[language][framework]({
      organization: process.env.SONAR_ORGANIZATION || 'organization-codeflow',
      projectKey: sonarKey,
    });
    workflowPropertiesContent = propertiesTemplates[language][framework]({
      organization: process.env.SONAR_ORGANIZATION || 'organization-codeflow',
      projectKey: sonarKey,
    });

    this.logInfo('Generated workflow content', { workflowContent });

    await this.contentService.pushCode(repoName, 'readme', readmeTemplate(repoName), 'README.md');
    await this.contentService.pushCode(repoName, 'ci', workflowContent, '.github/workflows/ci.yml');
    await this.contentService.pushCode(repoName, 'sonar', workflowPropertiesContent, 'sonar-project.properties');

    return true;
  }

  /**
   * Xóa workflow khỏi repository
   * @param repoName Tên repository
   * @param workflowName Tên file workflow
   * @returns Thông tin commit đã tạo
   */
  public async deleteWorkflow(repoName: string, workflowName: string): Promise<any> {
    this.logInfo('Deleting workflow', { repoName, workflowName });

    const path = `.github/workflows/${workflowName}.yml`;

    // Get file SHA
    const existingFile = await this.makeRequest<any>({
      method: 'GET',
      url: `${this.getOrgRepoUrl(repoName)}/contents/${path}`,
    });

    return this.makeRequest<any>({
      method: 'DELETE',
      url: `${this.getOrgRepoUrl(repoName)}/contents/${path}`,
      data: {
        message: `Delete ${workflowName} workflow`,
        sha: existingFile.sha,
        branch: 'main',
      },
    });
  }
}
