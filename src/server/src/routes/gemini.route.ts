import { GeminiController } from '@/controllers/gemini.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class GeminiRoute implements Routes {
  public path = '/gemini';
  public router = Router();
  public gemini = new GeminiController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/text`, AuthMiddleware, this.gemini.generateText);
  }
}
