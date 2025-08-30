import { DB } from '@/database';
import { CommitCreate, Commits, CommitUpdate } from '@/interfaces/commits.interface';
import { UserModel } from '@/models';
import { Service } from 'typedi';

@Service()
export class CommitService {
  public async findAllCommits(): Promise<Commits[]> {
    const commits = await DB.Commits.findAll();
    return commits;
  }

  public async findByRepoIdOrAuthorId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    repoId?: string,
    authorId?: string,
  ): Promise<{ count: number; rows: Commits[] }> {
    const offset = (page - 1) * pageSize;

    const where: any = {};
    if (repoId) where['reposId'] = repoId;
    if (authorId) where['authorId'] = authorId;

    if (pageSize == -1) {
      return await DB.Commits.findAndCountAll({
        where,
        order: [[sortBy, sortOrder]],
        distinct: true,
        col: 'commits.id',
      });
    }

    return await DB.Commits.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      distinct: true,
      col: 'commits.id',
      offset,
    });
  }

  public async findCommitByCommitSha(commitSha: string): Promise<Commits> {
    const commit = await DB.Commits.findOne({ where: { commitSha } });
    return commit;
  }

  public async createCommit(commit: CommitCreate): Promise<Commits> {
    const newCommit = await DB.Commits.create(commit);
    return newCommit;
  }

  public async updateCommit(commit: CommitUpdate): Promise<void> {
    await DB.Commits.update(commit, { where: { commitSha: commit.commitSha } });
  }

  public async getContributorsByRepoIdOrAuthorId(repoId?: string, authorId?: string): Promise<any> {
    const { sequelize } = DB;

    const whereCondition: any = {};
    if (repoId) whereCondition['reposId'] = repoId;
    if (authorId) whereCondition['authorId'] = authorId;

    // Get contributor stats
    const contributor = await DB.Commits.findOne({
      where: whereCondition,
      attributes: [
        authorId ? 'authorId' : 'reposId',
        [sequelize.fn('COUNT', sequelize.col('Commits.id')), 'totalCommits'],
        [sequelize.fn('SUM', sequelize.col('Commits.additions')), 'totalAdditions'],
        [sequelize.fn('SUM', sequelize.col('Commits.deletions')), 'totalDeletions'],
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
      commit: {
        total: parseInt(contributor.dataValues?.totalCommits || contributor.totalCommits) || 0,
        additions: parseInt(contributor.dataValues?.totalAdditions || contributor.totalAdditions) || 0,
        deletions: parseInt(contributor.dataValues?.totalDeletions || contributor.totalDeletions) || 0,
      },
    };
  }
}
