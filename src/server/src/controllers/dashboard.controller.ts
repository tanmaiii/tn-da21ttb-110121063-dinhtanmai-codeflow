import { RequestWithUser } from '@/interfaces/auth.interface';
import CodeAnalysisService from '@/services/code_analysis.service';
import { CourseService } from '@/services/courses.service';
import { ReposService } from '@/services/repos.service';
import { TagService } from '@/services/tag.service';
import { TopicService } from '@/services/topic.service';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class DashboardController {
  private readonly course: CourseService;
  private readonly tags: TagService;
  private readonly repos: ReposService;
  private readonly topic: TopicService;
  private readonly codeAnalysis: CodeAnalysisService;

  constructor() {
    this.course = Container.get(CourseService);
    this.tags = Container.get(TagService);
    this.repos = Container.get(ReposService);
    this.topic = Container.get(TopicService);
    this.codeAnalysis = Container.get(CodeAnalysisService);
  }

  public getCodeActivity = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const days: number = parseInt(req.query.days as string) || 7;

      const codeActivity = await this.course.getCourseAllActivity(undefined, days);

      res.status(200).json({ data: codeActivity, message: 'getCourseCodeActivity' });
    } catch (error) {
      next(error);
    }
  };

  public getTags = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tags = await this.tags.getTagsWithUsageCount();

      res.status(200).json({ data: tags, message: 'getTags' });
    } catch (error) {
      next(error);
    }
  };

  public getFramework = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courses = await this.repos.getRepoFramework();
      res.status(200).json({ data: courses, message: 'getFramework' });
    } catch (error) {
      next(error);
    }
  };

  public getCourseTypes = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courseTypes = await this.course.getCourseTypes();
      res.status(200).json({ data: courseTypes, message: 'getCourseTypes' });
    } catch (error) {
      next(error);
    }
  };

  public getTopicStatus = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const topicStatus = await this.topic.getTopicStatus(undefined, true);

      res.status(200).json({ data: topicStatus, message: 'getTopicStatus' });
    } catch (error) {
      next(error);
    }
  };

  public getCourseStatus = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courseStatus = await this.course.getCourseStatus();
      res.status(200).json({ data: courseStatus, message: 'getCourseStatus' });
    } catch (error) {
      next(error);
    }
  };

  public getCodeAnalysis = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const repos = await this.repos.findAll();
      const allMetrics = [];

      // Lấy tất cả metrics từ các repos
      for (const repo of repos) {
        const codeAnalysis = await this.codeAnalysis.findByTopic(repo.id);
        if (codeAnalysis?.metrics && Array.isArray(codeAnalysis.metrics)) {
          allMetrics.push(...codeAnalysis.metrics);
        }
      }

      // Map lại các metrics có cùng name
      const metricsMap = new Map();

      for (const metric of allMetrics) {
        const key = metric.name;

        if (metricsMap.has(key)) {
          const existing = metricsMap.get(key);
          const existingValue = parseFloat(existing.value) || 0;
          const currentValue = parseFloat(metric.value) || 0;
          existing.value = (existingValue + currentValue).toString();

          if (existing.bestValue === null && metric.bestValue !== null) {
            existing.bestValue = metric.bestValue;
          } else if (existing.bestValue !== null && metric.bestValue === null) {
          } else if ((existing.bestValue === true && metric.bestValue === false) || (existing.bestValue === false && metric.bestValue === true)) {
            existing.bestValue = false;
          }
        } else {
          metricsMap.set(key, {
            name: metric.name,
            value: metric.value,
            bestValue: metric.bestValue,
          });
        }
      }

      // Convert Map về Array
      const aggregatedMetrics = Array.from(metricsMap.values());

      res.status(200).json({
        data: aggregatedMetrics,
        message: 'Get code quality',
      });
    } catch (error) {
      next(error);
    }
  };

  public getContributors = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, sortBy = 'commit', order = 'DESC' } = req.query;
      const { count, rows } = await this.course.contributors(
        undefined,
        Number(page),
        Number(limit),
        String(sortBy) as 'commit' | 'pullRequest' | 'codeAnalysis' | 'name',
        (String(order).toUpperCase() as 'ASC' | 'DESC') || 'DESC',
      );
      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(Number(count) / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'get contributors',
      });
    } catch (error) {
      next(error);
    }
  };
}
