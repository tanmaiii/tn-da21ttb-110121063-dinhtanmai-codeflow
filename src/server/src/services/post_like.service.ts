import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { Notification } from '@/interfaces/notification.interface';
import { Post, PostLike } from '@/interfaces/posts.interface';
import { Service } from 'typedi';
import { NotificationService } from './notification.service';

@Service()
export class PostLikeService {
  constructor(private notificationService: NotificationService) {}
  public async findAll(): Promise<PostLike[]> {
    const allPostLikes: PostLike[] = await DB.PostLike.findAll();
    return allPostLikes;
  }

  public async findPostLikeById(postId: string, userId: string): Promise<PostLike> {
    const findPostLike: PostLike = await DB.PostLike.findOne({ where: { postId, userId } });

    return findPostLike;
  }

  public async createPostLike(postLikeData: Partial<PostLike>): Promise<Post> {
    const findPostLike: PostLike = await DB.PostLike.findOne({
      where: { postId: postLikeData.postId, userId: postLikeData.userId },
    });
    if (findPostLike) throw new HttpException(409, 'Post like already exists');

    DB.PostLike.create(postLikeData);
    const post = await DB.Posts.findOne({ where: { id: postLikeData.postId } });

    const notificationData: Notification = {
      type: ENUM_TYPE_NOTIFICATION.LIKE_POST,
      title: 'New Post Like',
      message: `New post like "${post.title}"`,
      userId: post.authorId,
      postId: postLikeData.postId,
      isRead: false,
      link: `/posts/${postLikeData.postId}`,
      authorId: postLikeData.userId,
    };

    await this.notificationService.createNotification(notificationData);

    return post;
  }

  public async deletePostLike(postLikeData: Partial<PostLike>): Promise<Post> {
    const findPostLike: PostLike = await DB.PostLike.findOne({
      where: { postId: postLikeData.postId, userId: postLikeData.userId },
    });
    if (!findPostLike) throw new HttpException(409, 'Post like already exists');

    await DB.PostLike.destroy({
      force: true,
      where: {
        postId: postLikeData.postId,
        userId: postLikeData.userId,
      },
    });

    const post = await DB.Posts.findOne({ where: { id: postLikeData.postId } });
    return post;
  }
}
