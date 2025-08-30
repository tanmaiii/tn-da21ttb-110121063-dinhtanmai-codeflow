import { SearchController } from '@/controllers/search.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class SearchRoute implements Routes {
  public path = '/search';
  public router = Router();
  public search = new SearchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ValidationMiddleware(GetAllQueryDto, 'query'), this.search.getAll);
  }
}
