import { TagController } from '@/controllers/tag.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { CreateTagDto, UpdateTagDto } from '@/dtos/tags.dto';
import { AuthMiddleware, isAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class TagRoute implements Routes {
  public path = '/tags';
  public router = Router();
  public tag = new TagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tag.getTags);
    this.router.get(`${this.path}/all`, isAdmin, ValidationMiddleware(GetAllQueryDto, 'query'), this.tag.getAllTags);
    this.router.get(`${this.path}/:id`, this.tag.getTagById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateTagDto), this.tag.createTag);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.tag.deleteTag);
    this.router.delete(`${this.path}/:id/force`, AuthMiddleware, this.tag.destroyTag);
    this.router.put(`${this.path}/:id/restore`, AuthMiddleware, this.tag.restoreTag);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateTagDto), this.tag.updateTag);
  }
}
