import { RequestWithUser } from '@/interfaces/auth.interface';
import { Tag } from '@/interfaces/tags.interface';
import { PostLikeService } from '@/services/post_like.service';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class PostLikeController {
  public like = Container.get(PostLikeService);

  public getLikePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;

      const findPostLike = await this.like.findPostLikeById(postId, userId);

      res.status(200).json({
        data: {
          isLike: findPostLike ? true : false,
        },
        message: 'found',
      });
    } catch (error) {
      next(error);
    }
  };

  public createLikePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
      const postLikeData = { postId, userId };
      const createPostLike = await this.like.createPostLike(postLikeData);
      res.status(201).json({ data: createPostLike, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLikePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
      const postLikeData = { postId, userId };
      const deletePostLike = await this.like.deletePostLike(postLikeData);
      res.status(200).json({ data: deletePostLike, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
