import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { TopicEvaluationsService } from '@/services/topic_evaluations.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class TopicEvaluationsController {
  public topicEvaluation = Container.get(TopicEvaluationsService);

  public getAllByTopicId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search } = req.query;

      const { count, rows } = await this.topicEvaluation.findAndCountAllWithPaginationByTopicId(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.params.topicId,
        String(search ?? ''),
      );

      res.status(201).json({
        message: 'get topic evaluation success',
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

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicEvaluation = await this.topicEvaluation.findTopicEvaluationById(req.params.id);
      res.status(200).json(topicEvaluation);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;

      const topicEvaluation = await this.topicEvaluation.createTopicEvaluation({
        ...req.body,
        userId: userData.id,
      });

      res.status(201).json(topicEvaluation);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicEvaluation = await this.topicEvaluation.updateTopicEvaluation(req.params.id, req.body);
      res.status(200).json(topicEvaluation);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicEvaluation = await this.topicEvaluation.deleteTopicEvaluation(req.params.id);
      res.status(200).json(topicEvaluation);
    } catch (error) {
      next(error);
    }
  };
}
