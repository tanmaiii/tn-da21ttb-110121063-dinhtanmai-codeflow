import { CommentController } from '@controllers/comment.controller';
import { CreateCommentDto } from '@dtos/comment.dto';
import { AuthMiddleware, isAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { GetAllQueryDto } from '@/dtos/common.dto';

export class CommentRoute implements Routes {
  public path = '/comments';
  public router = Router();
  public comment = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.comment.getComments);
    this.router.get(`${this.path}/:id`, this.comment.getCommentById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateCommentDto), this.comment.createComment);
    this.router.delete(`${this.path}/:id/force`, isAdmin, this.comment.destroyComment);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.comment.deleteComment);
    this.router.put(`${this.path}/:id/restore`, isAdmin, this.comment.restoreComment);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateCommentDto, 'body', true), this.comment.updateComment);
  }
}
