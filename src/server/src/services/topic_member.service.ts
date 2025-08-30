import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { TopicMember } from '@/interfaces/topics.interface';
import { Service } from 'typedi';

@Service()
export class TopicMemberService {
  public async findAll(): Promise<TopicMember[]> {
    const allTopicMembers: TopicMember[] = await DB.TopicMember.scope('withUser').findAll();
    return allTopicMembers;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: TopicMember[] }> {
    const { count, rows }: { count: number; rows: TopicMember[] } = await DB.TopicMember.scope('withUser').findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findTopicMemberById(topicMemberId: string): Promise<TopicMember> {
    const findTopicMember: TopicMember = await DB.TopicMember.scope('withUser').findByPk(topicMemberId);
    if (!findTopicMember) throw new HttpException(409, "Topic member doesn't exist");

    return findTopicMember;
  }

  public async findTopicMembersByTopicId(topicId: string): Promise<TopicMember[]> {
    const findTopicMembers: TopicMember[] = await DB.TopicMember.scope('withUser').findAll({ where: { topicId } });
    return findTopicMembers;
  }

  public async findTopicMembersByUserId(userId: string): Promise<TopicMember[]> {
    const findTopicMembers: TopicMember[] = await DB.TopicMember.scope('withUser').findAll({ where: { userId } });
    return findTopicMembers;
  }

  public async createTopicMember(topicMemberData: Partial<TopicMember>): Promise<TopicMember> {
    const findTopicMember: TopicMember[] = await DB.TopicMember.findAll({
      where: { topicId: topicMemberData.topicId, userId: topicMemberData.userId },
    });
    if (findTopicMember.length) return;
    const createTopicMemberData: TopicMember = await DB.TopicMember.create(topicMemberData);
    return createTopicMemberData;
  }

  public async updateTopicMember(topicMemberId: string, topicMemberData: Partial<TopicMember>): Promise<TopicMember> {
    const findTopicMember: TopicMember = await DB.TopicMember.findByPk(topicMemberId);
    if (!findTopicMember) throw new HttpException(409, "Topic member doesn't exist");

    await DB.TopicMember.update(topicMemberData, { where: { id: topicMemberId } });

    const updateTopicMember: TopicMember = await DB.TopicMember.findByPk(topicMemberId);
    return updateTopicMember;
  }

  public async deleteAllTopicMembers(topicId: string): Promise<void> {
    await DB.TopicMember.destroy({ where: { topicId } });
  }

  public async deleteTopicMember(topicMemberId: string): Promise<TopicMember> {
    const findTopicMember: TopicMember = await DB.TopicMember.findByPk(topicMemberId);
    if (!findTopicMember) throw new HttpException(409, "Topic member doesn't exist");

    await DB.TopicMember.destroy({ where: { id: topicMemberId } });

    const softDeletedTopicMember: TopicMember = await DB.TopicMember.findByPk(topicMemberId);
    return softDeletedTopicMember;
  }

  public async destroyTopicMember(topicMemberId: string): Promise<TopicMember> {
    const findTopicMember: TopicMember = await DB.TopicMember.findByPk(topicMemberId, { paranoid: false });
    if (!findTopicMember) throw new HttpException(409, "Topic member doesn't exist");

    await DB.TopicMember.destroy({ force: true, where: { id: topicMemberId } });

    return findTopicMember;
  }
}
