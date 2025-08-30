import { PullRequestsController } from '@/controllers/pull_requests.controller';
import { GetPullRequestByRepoIdDto } from '@/dtos/pull_request.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class PullRequestsRoute implements Routes {
  public path = '/pull-requests';
  public router = Router();
  public pullRequests = new PullRequestsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/repos/:id`,
      AuthMiddleware,
      ValidationMiddleware(GetPullRequestByRepoIdDto, 'query'),
      this.pullRequests.getAllPullRequestsByRepoId,
    );
  }
}
