import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { Notification } from '@/interfaces/notification.interface';
import { Op } from 'sequelize';
import { Service } from 'typedi';
import { DB } from '../database';
import { HttpException } from '../exceptions/HttpException';
import { Comment } from '../interfaces/comments.interface';
import { isEmpty } from '../utils/util';
import { CourseService } from './courses.service';
import { NotificationService } from './notification.service';
import { PostService } from './post.service';
@Service()
export class CommentService {
  constructor(private notificationService: NotificationService, private postService: PostService, private courseService: CourseService) {}

  public buildCommentTree = (comments, parentId = null) => {
    return comments
      .filter(comment => comment.parentId == parentId)
      .map(comment => ({
        ...comment.get({ plain: true }),
        replies: this.buildCommentTree(comments, comment.id),
      }));
  };

  public async findAllComment(): Promise<Comment[]> {
    const allComment: Comment[] = await DB.Comments.findAll({
      order: [['createdAt', 'DESC']],
    });
    return this.buildCommentTree(allComment);
  }

  public async findAndCountAllWithPagination(page = 1, pageSize = 10, search = '', isAdmin = false): Promise<{ count: number; rows: Comment[] }> {
    const { count, rows } = await DB.Comments.findAndCountAll({
      order: [['createdAt', 'DESC']],
      where: {
        content: { [Op.like]: `%${search}%` },
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      paranoid: !isAdmin,
    });
    return { count, rows };
  }

  public async findCommentById(commentId: string): Promise<Comment> {
    if (isEmpty(commentId)) throw new HttpException(400, 'CommentId is empty');
    const findComment = await DB.Comments.findByPk(commentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    return findComment;
  }

  public async findCommentByCourseId(courseId: string): Promise<Comment[]> {
    if (isEmpty(courseId)) throw new HttpException(400, 'CourseId is empty');
    const findComment = await DB.Comments.findAll({ where: { courseId, status: true } });
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    // return findComment;
    return this.buildCommentTree(findComment);
  }

  public async findCommentByPostId(postId: string): Promise<Comment[]> {
    if (isEmpty(postId)) throw new HttpException(400, 'PostId is empty');
    const findComment = await DB.Comments.findAll({ where: { postId, status: true }, order: [['createdAt', 'DESC']] });
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    // return findComment;
    return this.buildCommentTree(findComment);
  }

  public async createComment(commentData: Partial<Comment>): Promise<Comment> {
    if (isEmpty(commentData)) throw new HttpException(400, 'commentData is empty');

    const createCommentData: Comment = await DB.Comments.create(commentData);
    const comment = await this.findCommentById(createCommentData.id);

    const post = comment.postId ? await this.postService.findPostById(comment.postId) : null;
    const course = comment.courseId ? await this.courseService.findCourseById(comment.courseId) : null;

    // Tạo thông báo cho tác giả
    const notificationData: Notification = {
      type: comment.parentId ? ENUM_TYPE_NOTIFICATION.COMMENT_REPLY : ENUM_TYPE_NOTIFICATION.COMMENT,
      title: 'New Comment',
      message: `New comment "${commentData.content.slice(0, 10)}..."`,
      userId: post?.authorId ?? course?.authorId ?? undefined,
      postId: comment.postId ?? undefined,
      courseId: comment.courseId ?? undefined,
      isRead: false,
      link: comment.postId ? `/posts/${comment.postId}` : `/courses/${comment.courseId}`,
    };

    if (commentData.authorId !== post?.authorId && commentData.authorId !== course?.authorId) {
      await this.notificationService.createNotification(notificationData);
    }
    return createCommentData;
  }

  public async updateComment(commentId: string, commentData: Comment): Promise<Comment> {
    if (isEmpty(commentData)) throw new HttpException(400, 'commentData is empty');

    const findComment: Comment = await DB.Comments.findByPk(commentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    await DB.Comments.update(commentData, { where: { id: commentId } });

    const updateComment: Comment = await DB.Comments.findByPk(commentId);
    return updateComment;
  }

  public async deleteComment(commentId: string): Promise<Comment> {
    if (isEmpty(commentId)) throw new HttpException(400, 'CommentId is empty');

    const findComment: Comment = await DB.Comments.findByPk(commentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    await DB.Comments.destroy({ where: { id: commentId } });

    return findComment;
  }

  public async destroyComment(commentId: string): Promise<Comment> {
    const findComment: Comment = await DB.Comments.findByPk(commentId, { paranoid: false });
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    await DB.Comments.destroy({ force: true, where: { id: commentId } });

    return findComment;
  }

  public async restoreComment(commentId: string): Promise<Comment> {
    const findComment: Comment = await DB.Comments.findByPk(commentId, { paranoid: false });
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    await DB.Comments.restore({ where: { id: commentId } });

    return findComment;
  }
}
