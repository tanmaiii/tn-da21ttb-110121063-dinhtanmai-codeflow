import { TopicEvaluationsController } from '@/controllers/topic_evaluations.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { CreateTopicEvaluationDto } from '@/dtos/topics.dto';
import { AuthMiddleware, isTeacherOrAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class TopicEvaluationRoute implements Routes {
  public path = '/evaluations';
  public router = Router();
  public topicEvaluation = new TopicEvaluationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:topicId/topic`,
      AuthMiddleware,
      ValidationMiddleware(GetAllQueryDto, 'query'),
      this.topicEvaluation.getAllByTopicId,
    );
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.topicEvaluation.getById);
    this.router.post(`${this.path}`, isTeacherOrAdmin, ValidationMiddleware(CreateTopicEvaluationDto, 'body'), this.topicEvaluation.create);
    this.router.put(`${this.path}/:id`, isTeacherOrAdmin, this.topicEvaluation.update);
    this.router.delete(`${this.path}/:id`, isTeacherOrAdmin, this.topicEvaluation.delete);
  }
}
