import { CodeAnalysisCreate, CodeAnalysisMetrics } from '@/interfaces/code_analysis.interface';
import { CommitCreate } from '@/interfaces/commits.interface';
import { PullRequestsCreate, PullRequestsUpdate } from '@/interfaces/pull_requests.interface';
import CodeAnalysisService from '@/services/code_analysis.service';
import { CommitService } from '@/services/commit.service';
import { PullRequestsService } from '@/services/pull_requests.service';
import { ReposService } from '@/services/repos.service';
import { SonarService } from '@/services/sonar.service';
import { UserService } from '@/services/users.service';
import { logger } from '@/utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { PullRequestEvent, PushEvent, WorkflowRunEvent } from '@octokit/webhooks-types';
import { GitHubService } from '@services/github.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class GitHubController {
  public github: GitHubService;
  public commitService: CommitService;
  public userService: UserService;
  public reposService: ReposService;
  public sonarService: SonarService;
  public codeAnalysisService: CodeAnalysisService;
  public pullRequestsService: PullRequestsService;

  constructor() {
    this.github = Container.get(GitHubService);
    this.commitService = Container.get(CommitService);
    this.userService = Container.get(UserService);
    this.reposService = Container.get(ReposService);
    this.sonarService = Container.get(SonarService);
    this.codeAnalysisService = Container.get(CodeAnalysisService);
    this.pullRequestsService = Container.get(PullRequestsService);
  }

  public getUserInfoByUsername = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;

      if (!username) {
        throw new HttpException(400, 'Username is required');
      }

      const userData = await this.github.getUserInfoByUsername(username);
      res.status(200).json({ data: userData, message: 'github-user-info' });
    } catch (error) {
      next(error);
    }
  };

  public getOrganizationMembers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const members = await this.github.getOrganizationMembers();
      res.status(200).json({ data: members, message: 'github-organization-members' });
    } catch (error) {
      next(error);
    }
  };

  public getRepoInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { repoName } = req.params;
      const repoInfo = await this.github.getRepoInfo(repoName);
      res.status(200).json({ data: repoInfo, message: 'github-repo-info' });
    } catch (error) {
      next(error);
    }
  };

  public checkUserInOrganization = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;
      const user = await this.userService.findUserByUsername(username);
      if (!user) throw new HttpException(404, 'User not found');
      const userInOrg = await this.github.checkUserInOrganization(user.username);
      res.status(200).json({ data: userInOrg, message: 'github-user-in-organization' });
    } catch (error) {
      next(error);
    }
  };

  public inviteUserToOrganization = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;
      const user = await this.userService.findUserByUsername(username);
      if (!user) throw new HttpException(404, 'User not found');
      const userInOrg = await this.github.inviteUserToOrganization(user.username);
      res.status(200).json({ data: userInOrg, message: 'github-user-in-organization' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Thêm webhook commit
   */
  public addWebhookCommit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { webhookUrl } = req.body;
      const repos = await this.reposService.findAll();

      for (const repo of repos) {
        logger.info(`[GitHub Controller] repoName: ${repo.name}, webhookUrl: ${webhookUrl}`);
        await this.github.checkAndDeleteExistingWebhook(repo.name);
        await this.github.createWebhookCommit(repo.name, webhookUrl);
      }

      res.status(200).json({ message: 'Webhook added successfully' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Xử lý webhook commit
   */
  public handleWebhookCommit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const signature = req.headers['x-hub-signature-256'] as string;

      // Xác thực chữ ký từ webhook
      if (!signature || !this.github.verifyWebhookSignature(signature)) {
        throw new HttpException(401, 'Invalid webhook signature');
      }

      // Kiểm tra sự kiện từ webhook
      const event = req.headers['x-github-event'] as string;

      if (event === 'workflow_run') {
        const workflowEvent = body as WorkflowRunEvent;
        const { workflow_run } = workflowEvent;

        // Kiểm tra nếu workflow run đã completed
        if (workflow_run.status === 'completed') {
          // Xử lý logic khi workflow hoàn thành
          await this.processWorkflowCompletion(workflow_run);
        }

        res.status(200).json({ message: 'Workflow run webhook processed successfully' });
        return;
      }

      if (event === 'push') {
        const pushEvent = body as PushEvent;
        const { repository, commits, ref } = pushEvent;

        logger.info(`[GitHub Webhook] Push event received for repository: ${repository.full_name}`);
        logger.info(`[GitHub Webhook] Branch: ${ref}, Commits count: ${commits.length}`);

        for (const commit of commits) {
          await this.processCommit(commit, repository, ref);
        }

        res.status(200).json({ message: 'Webhook processed successfully' });
      }

      if (event === 'pull_request') {
        const pullRequestEvent = body as PullRequestEvent;
        const { pull_request } = pullRequestEvent;
        await this.processPullRequest(pull_request);
      }
    } catch (error) {
      logger.error(`[GitHub Webhook] Error processing webhook: ${error}`);
      next(error);
    }
  };

  // Xử lý khi workflow run hoàn thành
  private async processWorkflowCompletion(workflow_run: WorkflowRunEvent['workflow_run']) {
    try {
      let repo = null;
      try {
        repo = await this.reposService.findRepoByRepositoryName(workflow_run.repository.name);
      } catch (error) {
        logger.warn(`[GitHub Webhook] Repository not found: ${workflow_run.repository.name}`);
        return;
      }

      if (!repo) {
        logger.warn(`[GitHub Webhook] Repository not found: ${workflow_run.repository.name}`);
        return;
      }

      const sonarAnalysis = await this.sonarService.getMeasures(repo.sonarKey);

      if (sonarAnalysis.component.measures.length === 0) {
        return;
      }

      const user = await this.userService.findUserByUsername(workflow_run.actor.login);
      if (!user.uid || !user) throw new HttpException(404, 'User not found');

      const codeAnalysis: CodeAnalysisCreate = {
        reposId: repo.id,
        branch: workflow_run.head_branch,
        commitSha: workflow_run.head_sha,
        status: workflow_run.conclusion,
        workflowRunId: workflow_run.id.toString(),
        analyzedAt: new Date(),
        authorId: user.id,
      };

      const newCodeAnalysis = await this.codeAnalysisService.createCodeAnalysis(codeAnalysis);

      if (newCodeAnalysis.status === 'success') {
        for (const measure of sonarAnalysis.component.measures) {
          const codeAnalysisMetrics: CodeAnalysisMetrics = {
            codeAnalysisId: newCodeAnalysis.id,
            name: measure.metric,
            value: measure.value,
            bestValue: measure.bestValue,
          };
          await this.codeAnalysisService.createCodeAnalysisMetrics(codeAnalysisMetrics);
        }
        return;
      }

      return;
    } catch (error) {
      logger.error(`[GitHub Webhook] Error processing workflow completion: ${error}`);
    }
  }

  // Lưu commit
  private async processCommit(commit: PushEvent['commits'][0], repository: PushEvent['repository'], ref: string) {
    try {
      if (!commit.author.username) {
        logger.warn(`[GitHub Webhook] Commit ${commit.id} does not have author username, skipping...`);
        return;
      }

      const user = await this.userService.findUserByUsername(commit.author.username);
      if (!user.uid || !user) throw new HttpException(404, 'User not found');

      const repo = await this.reposService.findRepoByRepositoryName(repository.name);
      if (!repo) throw new HttpException(404, 'Repo not found');

      const commitDetail = await this.github.getCommitDetails(repository.name, commit.id);

      logger.info(`[GitHub Webhook] Commit ${commit.id} details: ${commit.message}`);

      const commitData: CommitCreate = {
        reposId: repo.id,
        commitSha: commit.id,
        message: commit.message,
        authorId: user.id,
        additions: commitDetail.stats.additions,
        deletions: commitDetail.stats.deletions,
        totalChanges: commitDetail.stats.total,
        isMerged: false,
        branch: ref.replace('refs/heads/', ''),
      };
      this.commitService.createCommit(commitData);
    } catch (error) {
      logger.error(`[GitHub Webhook Commit] ${commit.id}: ${error}`);
    }
  }

  // Lưu pull request
  private async processPullRequest(pullRequest: PullRequestEvent['pull_request']) {
    try {
      logger.info(`[GitHub Webhook] Processing pull request: ${JSON.stringify(pullRequest)}`);

      const user = await this.userService.findUserByUsername(pullRequest.user.login);
      if (!user.uid || !user) throw new HttpException(404, 'User not found');

      const repo = await this.reposService.findRepoByRepositoryName(pullRequest.head.repo.name);
      if (!repo) throw new HttpException(404, 'Repo not found');

      const pullRequestData: PullRequestsCreate = {
        reposId: repo.id,
        pullNumber: pullRequest.number,
        title: pullRequest.title,
        body: pullRequest.body || '',
        authorId: user.id,
        headBranch: pullRequest.head.ref,
        baseBranch: pullRequest.base.ref,
        commitCount: pullRequest.commits,
        additions: pullRequest.additions,
        deletions: pullRequest.deletions,
        status: pullRequest.state,
        mergedAt: pullRequest.merged_at ? new Date(pullRequest.merged_at) : undefined,
        closedAt: pullRequest.closed_at ? new Date(pullRequest.closed_at) : undefined,
      };

      const existingPullRequest = await this.pullRequestsService.findPullRequestByPullNumber(repo.id, pullRequest.number);

      if (existingPullRequest) {
        const pullRequestUpdate: PullRequestsUpdate = {
          id: existingPullRequest.id,
          ...pullRequestData,
        };
        await this.pullRequestsService.updatePullRequest(pullRequestUpdate);
        return;
      }

      await this.pullRequestsService.createPullRequest(pullRequestData);
    } catch (error) {
      logger.error(`[GitHub Webhook] Error processing pull request: ${error}`);
    }
  }
}
