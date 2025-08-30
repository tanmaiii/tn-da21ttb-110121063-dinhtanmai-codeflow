import { HttpException } from '@/exceptions/HttpException';
import { Post, PostCreate } from '@/interfaces/posts.interface';
import { isEmpty } from '@/utils/util';
import { Op, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import { TagService } from './tag.service';

@Service()
export class PostService {
  private readonly tagService: TagService;
  private readonly POST_NOT_FOUND = "Post doesn't exist";
  private readonly COMMENT_ID_EMPTY = 'CommentId is empty';

  constructor() {
    this.tagService = Container.get(TagService);
  }

  private getCommentCountLiteral() {
    return Sequelize.literal(`(
      SELECT COUNT(*)
      FROM comments AS c
      WHERE c.post_id = posts.id
    )`);
  }

  private getLikeCountLiteral() {
    return Sequelize.literal(`(
      SELECT COUNT(*)
      FROM post_likes AS pl
      WHERE pl.post_id = posts.id
    )`);
  }

  public async findAll(): Promise<Post[]> {
    return await DB.Posts.findAll({
      attributes: {
        include: [[this.getCommentCountLiteral(), 'commentCount']],
      },
      order: [['created_at', 'DESC']],
    });
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    search = '',
    isAdmin = false,
  ): Promise<{ count: number; rows: Post[] }> {
    const offset = (page - 1) * pageSize;

    const whereClause = {
      ...(!isAdmin && { status: true }),
      ...(search && { title: { [Op.like]: `%${search}%` } }),
    };

    return await DB.Posts.findAndCountAll({
      attributes: {
        include: [
          [this.getCommentCountLiteral(), 'commentCount'],
          [this.getLikeCountLiteral(), 'likeCount'],
        ],
      },
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      offset,
      distinct: true,
      col: 'posts.id',
      paranoid: !isAdmin,
    });
  }

  public async findPostByAuthorId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    authorId: string,
    isAdmin = false,
    search = '',
  ): Promise<{ count: number; rows: Post[] }> {
    const whereClause = {
      ...(!isAdmin && { status: true }),
      ...(authorId && { authorId }),
      ...(search && { title: { [Op.like]: `%${search}%` } }),
    };

    return await DB.Posts.findAndCountAll({
      attributes: {
        include: [
          [this.getCommentCountLiteral(), 'commentCount'],
          [this.getLikeCountLiteral(), 'likeCount'],
        ],
      },
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: pageSize == -1 ? undefined : pageSize,
      offset: pageSize == -1 ? undefined : (page - 1) * pageSize,
      distinct: true,
      col: 'posts.id',
      paranoid: !isAdmin,
    });
  }

  public async findPostByTagIdAlternative(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    tagId: string,
  ): Promise<{ count: number; rows: Post[] }> {
    // First get course IDs that have the specified tag
    const courseTagsResult = await DB.PostTag.findAll({
      where: {
        tagId,
      },
      attributes: ['postId'],
    });

    const postIds = courseTagsResult.map(ct => ct.postId);

    if (postIds.length === 0) {
      return { count: 0, rows: [] };
    }

    // Get total count of posts with this tag (excluding soft deleted posts for non-admin)
    const totalCount = await DB.Posts.count({
      where: {
        id: { [Op.in]: postIds },
      },
    });

    // Get paginated courses
    const posts = await DB.Posts.findAll({
      attributes: {
        include: [
          [this.getCommentCountLiteral(), 'commentCount'],
          [this.getLikeCountLiteral(), 'likeCount'],
        ],
      },
      where: {
        id: { [Op.in]: postIds },
      },
      include: [
        {
          model: DB.Tags,
          as: 'tags',
          through: {
            attributes: [],
          },
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
    });

    return { count: totalCount, rows: posts };
  }

  public async findPostById(id: string, isAdmin = false): Promise<Post> {
    const post = await DB.Posts.findByPk(id, {
      attributes: {
        include: [
          [this.getCommentCountLiteral(), 'commentCount'],
          [this.getLikeCountLiteral(), 'likeCount'],
        ],
      },
      paranoid: !isAdmin,
    });
    if (!post) throw new HttpException(409, this.POST_NOT_FOUND);
    return post;
  }

  public async createPost(postData: Partial<PostCreate>): Promise<Post> {
    const { tags, ...postDataWithoutTags } = postData;
    const createdPost = await DB.Posts.create(postDataWithoutTags);

    if (tags?.length) {
      await this.createPostTags(createdPost.id, tags);
    }

    return createdPost;
  }

  public async updatePost(id: string, postData: Partial<PostCreate>): Promise<Post> {
    if (isEmpty(id)) throw new HttpException(400, this.COMMENT_ID_EMPTY);

    const post = await this.findPostById(id, true);
    const { tags, ...postDataWithoutTags } = postData;

    await DB.Posts.update(postDataWithoutTags, { where: { id }, paranoid: false });

    if (tags?.length) {
      await this.createPostTags(id, tags);
    }

    return post;
  }

  public async deletePost(id: string): Promise<Post> {
    await DB.Posts.destroy({ where: { id } });

    const softDeletedPost = await DB.Posts.findByPk(id, { paranoid: false });
    if (!softDeletedPost) throw new HttpException(409, this.POST_NOT_FOUND);

    return softDeletedPost;
  }

  public async destroyPost(id: string): Promise<Post> {
    const post = await DB.Posts.findByPk(id, { paranoid: false });
    if (!post) throw new HttpException(409, this.POST_NOT_FOUND);

    await DB.Posts.destroy({ force: true, where: { id } });
    return post;
  }

  public async restorePost(id: string): Promise<Post> {
    const post = await DB.Posts.findByPk(id, { paranoid: false });
    if (!post) throw new HttpException(409, this.POST_NOT_FOUND);
    await DB.Posts.restore({ where: { id } });
    return post;
  }

  private async createPostTags(postId: string, tagIds: string[]): Promise<void> {
    await Promise.all(tagIds.map(tagId => this.tagService.createPostTag(postId, tagId)));
  }
}
