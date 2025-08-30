import { DB } from '@/database';
import { CodeAnalysis, CodeAnalysisCreate, CodeAnalysisMetrics, ICodeAnalysisMetrics } from '@/interfaces/code_analysis.interface';
import { UserModel } from '@/models';
import { Op } from 'sequelize';
import { Service } from 'typedi';

@Service()
export class CodeAnalysisService {
  // constructor(
  //   private readonly topicService = Container.get(TopicService),
  //   private readonly reposService = Container.get(ReposService)
  // ) {}

  public async createCodeAnalysis(codeAnalysis: CodeAnalysisCreate): Promise<CodeAnalysis> {
    const newCodeAnalysis = await DB.CodeAnalysis.create(codeAnalysis);
    return newCodeAnalysis;
  }

  public async createCodeAnalysisMetrics(codeAnalysisMetrics: CodeAnalysisMetrics): Promise<CodeAnalysisMetrics> {
    const newCodeAnalysisMetrics = await DB.CodeAnalysisMetrics.create(codeAnalysisMetrics);
    return newCodeAnalysisMetrics;
  }

  public async findAll(): Promise<CodeAnalysis[]> {
    const codeAnalyses = await DB.CodeAnalysis.findAll();
    return codeAnalyses;
  }

  public async findById(id: string): Promise<CodeAnalysis> {
    const codeAnalysis = await DB.CodeAnalysis.findByPk(id);
    return codeAnalysis;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ count: number; rows: CodeAnalysis[] }> {
    return await DB.CodeAnalysis.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'codeAnalysis.id',
    });
  }

  public async findByRepoIdOrAuthorId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    repoId?: string,
    authorId?: string,
  ): Promise<{ count: number; rows: CodeAnalysis[] }> {
    const offset = (page - 1) * pageSize;

    const where: any = {};
    if (repoId) {
      where.reposId = repoId;
    }
    if (authorId) {
      where.authorId = authorId;
    }

    return await DB.CodeAnalysis.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      distinct: true,
      col: 'codeAnalysis.id',
      offset,
    });
  }

  public async findByTopic(reposId: string): Promise<ICodeAnalysisMetrics> {
    const codeAnalysis = await DB.CodeAnalysis.findOne({
      where: { reposId, branch: 'master', status: 'success' },
      order: [['analyzedAt', 'DESC']],
      include: [
        {
          model: DB.CodeAnalysisMetrics,
          as: 'metrics',
        },
      ],
      nest: true,
      raw: false,
    });

    if (!codeAnalysis) {
      return null;
    }

    // Convert Sequelize instance to plain object
    const plainResult = codeAnalysis.toJSON();
    return plainResult as ICodeAnalysisMetrics;
  }

  public async findByRepoIdWithTimeFilter(repoId: string, timeframe: string): Promise<CodeAnalysis[]> {
    // Tìm ngày đánh giá cuối cùng của repo này
    const latestAnalysis = await DB.CodeAnalysis.findOne({
      where: { reposId: repoId },
      order: [['analyzedAt', 'DESC']],
      attributes: ['analyzedAt'],
    });

    if (!latestAnalysis) {
      return [];
    }

    const latestDate = new Date(latestAnalysis.analyzedAt);
    const startDate = new Date(latestDate);

    // Tính toán thời gian bắt đầu dựa trên timeframe từ ngày đánh giá cuối cùng
    switch (timeframe) {
      case '7d':
        startDate.setDate(latestDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(latestDate.getDate() - 30);
        break;
      case '3m':
        startDate.setMonth(latestDate.getMonth() - 3);
        break;
      case '6m':
        startDate.setMonth(latestDate.getMonth() - 6);
        break;
      case '1y':
        startDate.setFullYear(latestDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(latestDate.getDate() - 7); // Mặc định là 7 ngày
    }

    return await DB.CodeAnalysis.findAll({
      where: {
        reposId: repoId,
        analyzedAt: {
          [Op.gte]: startDate,
          [Op.lte]: latestDate,
        },
      },
      order: [['analyzedAt', 'ASC']],
    });
  }

  public async getContributorsByRepoIdOrAuthorId(repoId?: string, authorId?: string): Promise<any> {
    const { sequelize } = DB;

    const whereCondition: any = {};
    if (repoId) whereCondition['reposId'] = repoId;
    if (authorId) whereCondition['authorId'] = authorId;

    // Get contributor stats
    const contributor = await DB.CodeAnalysis.findOne({
      where: whereCondition,
      attributes: [
        authorId ? 'authorId' : 'reposId',
        [sequelize.fn('COUNT', sequelize.col('CodeAnalysis.id')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN `CodeAnalysis`.`status` = 'success' THEN 1 ELSE NULL END")), 'success'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN `CodeAnalysis`.`status` = 'failure' THEN 1 ELSE NULL END")), 'failure'],
      ],
      group: authorId ? ['authorId'] : ['reposId'],
      raw: false,
      include: {
        model: UserModel,
        as: 'author',
        attributes: [],
      },
    });

    if (!contributor) {
      return null;
    }

    return this.formatContributorData(contributor);
  }

  private formatContributorData(contributor: any): any {
    return {
      codeAnalysis: {
        total: parseInt(contributor.dataValues?.total || contributor.total) || 0,
        success: parseInt(contributor.dataValues?.success || contributor.success) || 0,
        failure: parseInt(contributor.dataValues?.failure || contributor.failure) || 0,
      },
    };
  }

  public async getCodeQuality(): Promise<any> {
    const codeQuality = await DB.CodeAnalysisMetrics.findAll({
      where: { name: 'code_quality' },
    });
    return codeQuality;
  }
}

export default CodeAnalysisService;
