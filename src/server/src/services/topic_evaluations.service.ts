import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { Notification } from '@/interfaces/notification.interface';
import { TopicEvaluations } from '@/interfaces/topics.interface';
import { Service } from 'typedi';
import { NotificationService } from './notification.service';
import { TopicMemberService } from './topic_member.service';
import { Op } from 'sequelize';

@Service()
export class TopicEvaluationsService {
  constructor(private notificationService: NotificationService, private topicMemberService: TopicMemberService) {}

  public async findAll(): Promise<TopicEvaluations[]> {
    const allTopicEvaluations: TopicEvaluations[] = await DB.TopicEvaluations.findAll();
    return allTopicEvaluations;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: TopicEvaluations[] }> {
    const { count, rows }: { count: number; rows: TopicEvaluations[] } = await DB.TopicEvaluations.findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findAndCountAllWithPaginationByTopicId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    topicId: string,
    search = '',
  ): Promise<{ count: number; rows: TopicEvaluations[] }> {
    const offset = (page - 1) * pageSize;

    const { count, rows } = await DB.TopicEvaluations.findAndCountAll({
      where: {
        ...(search && { evaluation: { [Op.like]: `%${search}%` } }),
        topicId,
      },
      limit: pageSize == -1 ? undefined : pageSize,
      offset: pageSize == -1 ? undefined : offset,
      order: [[sortBy, sortOrder]],
    });
    return { count, rows };
  }

  //Giu
  public async findTopicEvaluationById(topicEvaluationId: string): Promise<TopicEvaluations> {
    const findTopicEvaluation: TopicEvaluations = await DB.TopicEvaluations.findByPk(topicEvaluationId);
    if (!findTopicEvaluation) throw new HttpException(409, "Topic evaluation doesn't exist");

    return findTopicEvaluation;
  }

  //Giu
  public async findTopicEvaluationsByTopicId(topicId: string): Promise<TopicEvaluations[]> {
    const findTopicEvaluations: TopicEvaluations[] = await DB.TopicEvaluations.findAll({ where: { topicId } });
    return findTopicEvaluations;
  }

  //Xoa
  public async findTopicEvaluationsByUserId(userId: string): Promise<TopicEvaluations[]> {
    const findTopicEvaluations: TopicEvaluations[] = await DB.TopicEvaluations.findAll({ where: { userId } });
    return findTopicEvaluations;
  }

  public async createTopicEvaluation(topicEvaluationData: Partial<TopicEvaluations>): Promise<TopicEvaluations> {
    const createTopicEvaluationData: TopicEvaluations = await DB.TopicEvaluations.create(topicEvaluationData);
    const members = await this.topicMemberService.findTopicMembersByTopicId(topicEvaluationData.topicId);

    const userId =
      members.find(member => member.role === 'leader')?.userId || (members.length > 0 && members[0].userId) || topicEvaluationData.userId;

    // Tạo thông báo cho leader
    const notificationData: Notification = {
      type: ENUM_TYPE_NOTIFICATION.TOPIC_EVALUATION,
      title: 'New Topic Evaluation',
      message: `New topic evaluation "${createTopicEvaluationData.evaluation.slice(0, 10)}..."`,
      userId,
      isRead: false,
      topicId: createTopicEvaluationData.topicId,
      link: `/topics/${createTopicEvaluationData.topicId}`,
    };

    await this.notificationService.createNotification(notificationData);

    return createTopicEvaluationData;
  }

  public async updateTopicEvaluation(topicEvaluationId: string, topicEvaluationData: Partial<TopicEvaluations>): Promise<TopicEvaluations> {
    const findTopicEvaluation: TopicEvaluations = await DB.TopicEvaluations.findByPk(topicEvaluationId);
    if (!findTopicEvaluation) throw new HttpException(409, "Topic evaluation doesn't exist");

    await DB.TopicEvaluations.update(topicEvaluationData, { where: { id: topicEvaluationId } });

    const updateTopicEvaluation: TopicEvaluations = await DB.TopicEvaluations.findByPk(topicEvaluationId);
    return updateTopicEvaluation;
  }

  public async deleteTopicEvaluation(topicEvaluationId: string): Promise<TopicEvaluations> {
    const findTopicEvaluation: TopicEvaluations = await DB.TopicEvaluations.findByPk(topicEvaluationId);
    if (!findTopicEvaluation) throw new HttpException(409, "Topic evaluation doesn't exist");

    await DB.TopicEvaluations.destroy({ where: { id: topicEvaluationId } });

    const softDeletedTopicEvaluation: TopicEvaluations = await DB.TopicEvaluations.findByPk(topicEvaluationId);
    return softDeletedTopicEvaluation;
  }

  public async destroyTopicEvaluation(topicEvaluationId: string): Promise<TopicEvaluations> {
    const findTopicEvaluation: TopicEvaluations = await DB.TopicEvaluations.findByPk(topicEvaluationId, { paranoid: false });
    if (!findTopicEvaluation) throw new HttpException(409, "Topic evaluation doesn't exist");

    await DB.TopicEvaluations.destroy({ force: true, where: { id: topicEvaluationId } });

    return findTopicEvaluation;
  }
}
