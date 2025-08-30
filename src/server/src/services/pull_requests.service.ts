import { DB } from '@/database';
import { PullRequests, PullRequestsCreate, PullRequestsUpdate } from '@/interfaces/pull_requests.interface';
import { UserModel } from '@/models';
import { ReviewAIModel } from '@/models/reviews_ai.model';
import { Service } from 'typedi';

@Service()
export class PullRequestsService {
  public async findPullRequestByPullNumber(reposId: string, pullNumber: number): Promise<PullRequests> {
    const pullRequest = await DB.PullRequests.findOne({
      where: { reposId, pullNumber },
      include: {
        model: ReviewAIModel,
        as: 'reviewsAI',
        separate: true,
        order: [['createdAt', 'DESC']],
        limit: 1,
      },
    });
    return pullRequest;
  }

  public async findById(id: string): Promise<PullRequests> {
    const pullRequest = await DB.PullRequests.findByPk(id, {
      include: {
        model: ReviewAIModel,
        as: 'reviewsAI',
        separate: true,
        order: [['createdAt', 'DESC']],
        limit: 1,
      },
    });
    return pullRequest;
  }

  public async findAllPullRequests(): Promise<PullRequests[]> {
    const pullRequests = await DB.PullRequests.findAll();
    return pullRequests;
  }

  public async findByRepoIdOrAuthorId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    repoId?: string,
    userId?: string,
  ): Promise<{ count: number; rows: PullRequests[] }> {
    const offset = (page - 1) * pageSize;

    const where: any = {};
    if (repoId) where['reposId'] = repoId;
    if (userId) where['authorId'] = userId;

    if (pageSize == -1) {
      return await DB.PullRequests.findAndCountAll({
        where,
        order: [[sortBy, sortOrder]],
        include: [
          {
            model: ReviewAIModel,
            as: 'reviewsAI',
            separate: true, // Tránh duplicate data
            order: [['createdAt', 'DESC']], // Sắp xếp theo thời gian tạo mới nhất
            limit: 1, // Chỉ lấy review AI mới nhất
          },
        ],
      });
    }

    return await DB.PullRequests.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      offset,
      include: [
        {
          model: ReviewAIModel,
          as: 'reviewsAI',
          separate: true, // Tránh duplicate data
          order: [['createdAt', 'DESC']], // Sắp xếp theo thời gian tạo mới nhất
          limit: 1, // Chỉ lấy review AI mới nhất
        },
      ],
    });
  }

  public async createPullRequest(pullRequest: PullRequestsCreate): Promise<PullRequests> {
    const newPullRequest = await DB.PullRequests.create(pullRequest);
    return newPullRequest;
  }

  public async updatePullRequest(pullRequest: PullRequestsUpdate): Promise<void> {
    await DB.PullRequests.update(pullRequest, { where: { id: pullRequest.id } });
  }

  public async deletePullRequest(id: string): Promise<void> {
    await DB.PullRequests.destroy({ where: { id } });
  }

  public async getLatestReviewAI(pullRequestId: string): Promise<any> {
    const reviewAI = await DB.ReviewsAI.findOne({
      where: { pullRequestId },
      order: [['createdAt', 'DESC']],
    });
    return reviewAI;
  }

  public async getContributorsByRepoIdOrAuthorId(repoId?: string, authorId?: string): Promise<any> {
    const { sequelize } = DB;

    const whereCondition: any = {};
    if (repoId) whereCondition['reposId'] = repoId;
    if (authorId) whereCondition['authorId'] = authorId;

    // Get contributor stats
    const contributor = await DB.PullRequests.findOne({
      where: whereCondition,
      attributes: [
        authorId ? 'authorId' : 'reposId',
        [sequelize.fn('COUNT', sequelize.col('pull_requests.id')), 'totalPullRequests'],
        [sequelize.fn('SUM', sequelize.col('pull_requests.additions')), 'totalAdditions'],
        [sequelize.fn('SUM', sequelize.col('pull_requests.deletions')), 'totalDeletions'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN `pull_requests`.`status` = 'open' THEN 1 ELSE NULL END")), 'open'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN `pull_requests`.`status` = 'closed' THEN 1 ELSE NULL END")), 'closed'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN `pull_requests`.`status` = 'merged' THEN 1 ELSE NULL END")), 'merged'],
      ],
      group: authorId ? ['authorId'] : ['reposId'],
      include: {
        model: UserModel,
        as: 'author',
        attributes: [],
      },
      raw: false,
    });

    if (!contributor) {
      return null;
    }

    return this.formatContributorData(contributor);
  }

  private formatContributorData(contributor: any): any {
    return {
      pullRequest: {
        total: parseInt(contributor.dataValues?.totalPullRequests || contributor.totalPullRequests) || 0,
        additions: parseInt(contributor.dataValues?.totalAdditions || contributor.totalAdditions) || 0,
        deletions: parseInt(contributor.dataValues?.totalDeletions || contributor.totalDeletions) || 0,
        open: parseInt(contributor.dataValues?.open || contributor.open) || 0,
        closed: parseInt(contributor.dataValues?.closed || contributor.closed) || 0,
        merged: parseInt(contributor.dataValues?.merged || contributor.merged) || 0,
      },
    };
  }
}
