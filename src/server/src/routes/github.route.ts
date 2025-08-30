import { AddWebHookDto } from '@/dtos/github.dto';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { GitHubController } from '@controllers/github.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class GitHubRoute implements Routes {
  public path = '/github';
  public router = Router();
  public github = new GitHubController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/repos/:repoName`, this.github.getRepoInfo);

    this.router.get(`${this.path}/user/:username`, this.github.getUserInfoByUsername);

    this.router.get(`${this.path}/orgs/members`, this.github.getOrganizationMembers);

    this.router.get(`${this.path}/orgs/check-user/:username`, this.github.checkUserInOrganization);

    this.router.post(`${this.path}/orgs/invite-user/:username`, this.github.inviteUserToOrganization);

    this.router.post(`${this.path}/webhook`, this.github.handleWebhookCommit);

    this.router.post(`${this.path}/add-webhook`, ValidationMiddleware(AddWebHookDto, 'body'), this.github.addWebhookCommit);
  }
}
