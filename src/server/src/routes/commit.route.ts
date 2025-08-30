import { CommitController } from '@/controllers/commit.controller';
import { GetCommitByRepoIdDto } from '@/dtos/commit.dto';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class CommitRoute implements Routes {
  public path = '/commits';
  public router = Router();
  public commit = new CommitController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/repos/:id`, AuthMiddleware, ValidationMiddleware(GetCommitByRepoIdDto, 'query'), this.commit.getAllCommitByRepoId);
  }
}
