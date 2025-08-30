import { RequestWithUser } from '@/interfaces/auth.interface';
import CodeAnalysisService from '@/services/code_analysis.service';
import { CommitService } from '@/services/commit.service';
import { PullRequestsService } from '@/services/pull_requests.service';
import { ReposService } from '@/services/repos.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class ReposController {
  private readonly reposService: ReposService;
  private readonly codeAnalysisService: CodeAnalysisService;
  private readonly commitService: CommitService;
  private readonly pullRequestService: PullRequestsService;

  constructor() {
    this.reposService = Container.get(ReposService);
    this.codeAnalysisService = Container.get(CodeAnalysisService);
    this.commitService = Container.get(CommitService);
    this.pullRequestService = Container.get(PullRequestsService);
  }

  public getRepos = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search } = req.query;
      const isAdmin = req.user?.role === 'admin';
      const { count, rows } = await this.reposService.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(search ?? ''),
        isAdmin,
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getByTopic = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isAdmin = req.user?.role === 'admin';
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search = '' } = req.query;
      const { count, rows } = await this.reposService.findAndCountByTopic(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(search),
        id,
        isAdmin,
      );
      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getRepoById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const isAdmin = req.user?.role === 'admin';
      const repo = await this.reposService.findById(req.params.id, isAdmin);
      res.status(200).json({
        data: repo,
        message: 'Find repos by id',
      });
    } catch (error) {
      next(error);
    }
  };

  public getRepoStats = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.getRepoStats(req.params.id);
      res.status(200).json({
        data: repo,
        message: 'Repository stats',
      });
    } catch (error) {
      next(error);
    }
  };

  public createRepo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.createRepo({ ...req.body, authorId: req.user.id });
      res.status(201).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public updateRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.updateRepo(req.params.id, req.body);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public deleteRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.deleteRepo(req.params.id);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public destroyRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.destroyRepo(req.params.id);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public restoreRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.restoreRepo(req.params.id);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public getRepoContributors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.getRepoContributors(req.params.id);
      res.status(200).json({
        data: repo,
        message: 'Get repo contributors',
      });
    } catch (error) {
      next(error);
    }
  };

  public getRepoFramework = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.courseId;
      const framework = await this.reposService.getRepoFramework(courseId);
      res.status(200).json({ data: framework, message: 'Get repo framework' });
    } catch (error) {
      next(error);
    }
  };
}
