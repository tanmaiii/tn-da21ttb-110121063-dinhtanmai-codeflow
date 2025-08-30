import { CodeAnalysisTimeframeQueryDto, GetCodeAnalysisByRepoIdDto } from '@/dtos/code_analysis.dto';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CodeAnalysisController } from '@controllers/code_analysis.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class CodeAnalysisRoute implements Routes {
  public path = '/code-analysis';
  public router = Router();
  public codeAnalysis = new CodeAnalysisController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.codeAnalysis.getCodeAnalyses);
    this.router.get(
      `${this.path}/repos/:id`,
      AuthMiddleware,
      ValidationMiddleware(GetCodeAnalysisByRepoIdDto, 'query'),
      this.codeAnalysis.getCodeAnalysisByRepoId,
    );

    this.router.get(
      `${this.path}/repos/:id/timeframe`,
      AuthMiddleware,
      ValidationMiddleware(CodeAnalysisTimeframeQueryDto, 'query'),
      this.codeAnalysis.getCodeAnalysisByRepoIdWithTimeFilter,
    );

    this.router.get(`${this.path}/repos/:id/contributors`, AuthMiddleware, this.codeAnalysis.getCodeAnalysisByRepoIdWithTimeFilter);
    this.router.get(`${this.path}/topic/:id`, AuthMiddleware, this.codeAnalysis.getCodeAnalysisByTopicId);
    this.router.get(`${this.path}/course/:id`, AuthMiddleware, this.codeAnalysis.getCodeAnalysisByCourseId);
  }
}
