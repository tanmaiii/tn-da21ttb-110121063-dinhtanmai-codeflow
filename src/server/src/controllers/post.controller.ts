import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { PostCreate } from '@/interfaces/posts.interface';
import { User } from '@/interfaces/users.interface';
import { CommentService } from '@/services/comment.service';
import { PostService } from '@/services/post.service';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class PostController {
  private readonly post: PostService;
  private readonly comment: CommentService;
  private readonly FORBIDDEN_MESSAGE = 'Forbidden';

  constructor() {
    this.post = Container.get(PostService);
    this.comment = Container.get(CommentService);
  }

  private async checkPostOwnership(postId: string, user: User): Promise<void> {
    const post = await this.post.findPostById(postId, user.role === 'admin');
    if (post.authorId !== user.id && user.role !== 'admin') {
      throw new HttpException(403, 'Check ownership failed');
    }
  }

  public getPosts = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search } = req.query;
      const isAdmin = req.user?.role === 'admin';

      const { count, rows } = await this.post.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(search ?? ''),
        isAdmin,
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getPostsByTagId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;

      const { count, rows } = await this.post.findPostByTagIdAlternative(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.params.idTag,
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAllByTagId',
      });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = req.params.id;
      const isAdmin = req.user?.role === 'admin';
      const post = await this.post.findPostById(postId, isAdmin);

      if (!isAdmin && !post.status) {
        throw new HttpException(403, this.FORBIDDEN_MESSAGE);
      }

      res.status(200).json({
        data: post,
        message: 'findOne',
      });
    } catch (error) {
      next(error);
    }
  };

  public getPostByUserId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search } = req.query;
      const isAdmin = req.user?.role === 'admin';

      const { count, rows } = await this.post.findPostByAuthorId(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.params.userId,
        isAdmin,
        String(search ?? ''),
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'find by user id',
      });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: authorId } = req.user;
      const postData: Partial<PostCreate> = req.body;

      const createdPost = await this.post.createPost({
        ...postData,
        authorId,
      });

      res.status(201).json({
        data: createdPost,
        message: 'created',
      });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = req.params.id;
      const postData: Partial<PostCreate> = req.body;

      await this.checkPostOwnership(postId, req.user);

      const updatedPost = await this.post.updatePost(postId, {
        ...postData,
      });

      res.status(200).json({
        data: updatedPost,
        message: 'updated',
      });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = req.params.id;

      await this.checkPostOwnership(postId, req.user);

      const deletedPost = await this.post.deletePost(postId);

      res.status(200).json({
        data: deletedPost,
        message: 'deleted',
      });
    } catch (error) {
      next(error);
    }
  };

  public destroyPost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = req.params.id;

      await this.checkPostOwnership(postId, req.user);

      const destroyedPost = await this.post.destroyPost(postId);

      res.status(200).json({
        data: destroyedPost,
        message: 'destroyed',
      });
    } catch (error) {
      next(error);
    }
  };

  public restorePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = req.params.id;
      const restoredPost = await this.post.restorePost(postId);

      res.status(200).json({
        data: restoredPost,
        message: 'restored',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCommentsByPostId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = req.params.id;
      const comments = await this.comment.findCommentByPostId(postId);

      res.status(200).json({
        data: comments,
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };
}
