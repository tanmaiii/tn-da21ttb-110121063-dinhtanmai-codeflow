import { RequestWithUser } from '@/interfaces/auth.interface';
import { CodeAnalysisService } from '@/services/code_analysis.service';
import { ReposService } from '@/services/repos.service';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';

export class CodeAnalysisController {
  public codeAnalysisService = Container.get(CodeAnalysisService);
  public reposService = Container.get(ReposService);

  private createPaginationResponse(count: number | string, page: number | string, limit: number | string) {
    return {
      totalItems: count,
      totalPages: Math.ceil(Number(count) / Number(limit)),
      currentPage: Number(page),
      pageSize: Number(limit),
    };
  }

  // Danh sách đánh giá code theo repos
  public getCodeAnalyses = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.codeAnalysisService.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy ?? ''),
        String(order ?? 'DESC') as 'ASC' | 'DESC',
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  // Chi tiết đánh giá code
  public getCodeAnalysisByRepoId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', authorId } = req.query;
      const { count, rows } = await this.codeAnalysisService.findByRepoIdOrAuthorId(
        Number(page),
        Number(limit),
        String(sortBy ?? ''),
        String(order ?? 'DESC') as 'ASC' | 'DESC',
        id,
        String(authorId ?? ''),
      );
      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findByRepoId',
      });
    } catch (error) {
      next(error);
    }
  };

  // Lấy tất cả đánh giá code theo repos và thời gian
  public getCodeAnalysisByRepoIdWithTimeFilter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { timeframe = '7d' } = req.query;

      const data = await this.codeAnalysisService.findByRepoIdWithTimeFilter(id, String(timeframe));

      res.status(200).json({
        data,
        message: 'findByRepoIdWithTimeFilter',
      });
    } catch (error) {
      next(error);
    }
  };

  //
  public getCodeAnalysisByRepoIdWithContributors = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.codeAnalysisService.getContributorsByRepoIdOrAuthorId(id);
      res.status(200).json({ data, message: 'get contributors by repo id' });
    } catch (error) {
      next(error);
    }
  };

  // Lấy tất cả đánh giá code theo topic và thời gian
  public getCodeAnalysisByTopicId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const repos = await this.reposService.findByByTopicId(id);
      const allMetrics = [];

      // Lấy tất cả metrics từ các repos
      for (const repo of repos) {
        const codeAnalysis = await this.codeAnalysisService.findByTopic(repo.id);
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
        message: 'Get code analysis by topic id with time filter',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCodeAnalysisByCourseId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const repos = await this.reposService.findByByCourseId(id);
      const allMetrics = [];

      // Lấy tất cả metrics từ các repos
      for (const repo of repos) {
        const codeAnalysis = await this.codeAnalysisService.findByTopic(repo.id);
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
        message: 'Get code analysis by course id with time filter',
      });
    } catch (error) {
      next(error);
    }
  };
}
