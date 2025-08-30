import { SonarController } from '@/controllers/sonar.controller';
import { CreateSonarDto, DeleteSonarDto, GetMeasuresDto } from '@/dtos/sonar.dto';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class SonarRoute implements Routes {
  public path = '/sonar';
  public router = Router();
  public sonar = new SonarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateSonarDto, 'body'), this.sonar.createProject);
    this.router.delete(`${this.path}`, ValidationMiddleware(DeleteSonarDto, 'body'), this.sonar.deleteProject);
    this.router.get(`${this.path}/:name`, ValidationMiddleware(GetMeasuresDto, 'params'), this.sonar.getMeasures);
  }
}
