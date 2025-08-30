import { DashboardController } from '@/controllers/dashboard.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { GetCodeActivityDto } from '@/dtos/courses.dto';
import { Routes } from '@/interfaces/routes.interface';
import { isAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class DashboardRoute implements Routes {
  public path = '/dashboard';
  public router = Router();
  public dashboard = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/code-activity`, isAdmin, ValidationMiddleware(GetCodeActivityDto, 'query'), this.dashboard.getCodeActivity);
    this.router.get(`${this.path}/tags`, isAdmin, this.dashboard.getTags);
    this.router.get(`${this.path}/framework`, isAdmin, this.dashboard.getFramework);
    this.router.get(`${this.path}/course-types`, isAdmin, this.dashboard.getCourseTypes);
    this.router.get(`${this.path}/topic-status`, isAdmin, this.dashboard.getTopicStatus);
    this.router.get(`${this.path}/course-status`, isAdmin, this.dashboard.getCourseStatus);
    this.router.get(`${this.path}/code-analysis`, isAdmin, this.dashboard.getCodeAnalysis);
    this.router.get(`${this.path}/contributors`, isAdmin, ValidationMiddleware(GetAllQueryDto, 'query'), this.dashboard.getContributors);
  }
}
