import { PostController } from '@/controllers/post.controller';
import { PostLikeController } from '@/controllers/post_like.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { CreatePostDto, UpdatePostDto } from '@/dtos/posts.dto';
import { AuthMiddleware, OptionalAuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class PostRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public post = new PostController();
  public like = new PostLikeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, OptionalAuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.post.getPosts);
    this.router.get(`${this.path}/tag/:idTag`, OptionalAuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.post.getPostsByTagId);
    this.router.get(`${this.path}/:id`, OptionalAuthMiddleware, this.post.getPostById);
    this.router.get(`${this.path}/:userId/user`, OptionalAuthMiddleware, this.post.getPostByUserId);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreatePostDto), this.post.createPost);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.post.deletePost);
    this.router.delete(`${this.path}/:id/force`, AuthMiddleware, this.post.destroyPost);
    this.router.put(`${this.path}/:id/restore`, AuthMiddleware, this.post.restorePost);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdatePostDto, 'body', true), this.post.updatePost);

    this.router.get(`${this.path}/:id/like`, AuthMiddleware, this.like.getLikePost);
    this.router.post(`${this.path}/:id/like`, AuthMiddleware, this.like.createLikePost);
    this.router.delete(`${this.path}/:id/like`, AuthMiddleware, this.like.deleteLikePost);

    this.router.get(`${this.path}/:id/comments`, this.post.getCommentsByPostId);
  }
}
