import { ReviewsAIController } from '@/controllers/reviews_ai.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class ReviewsAIRoute implements Routes {
  public path = '/reviews-ai';
  public router = Router();
  public reviewsAI = new ReviewsAIController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/repos/:reposId/pull-request/:prId`, AuthMiddleware, this.reviewsAI.evaluatePullRequestGithub);
  }
}
