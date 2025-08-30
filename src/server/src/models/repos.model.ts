import { Repos } from '@/interfaces/repos.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserModel } from './users.model';
import { TopicModel } from './topics.model';
import { TopicMemberModel } from './topic_member.model';

type ReposCreationAttributes = Optional<Repos, 'id' | 'name' | 'url' | 'courseId' | 'topicId' | 'authorId' | 'language' | 'framework' | 'sonarKey'>;

export class ReposModel extends Model<Repos, ReposCreationAttributes> implements Repos {
  public id: string;
  public name: string;
  public url: string;
  public courseId: string;
  public topicId: string;
  public authorId: string;
  public language: string;
  public framework: string;
  public sonarKey: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ReposModel {
  ReposModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      topicId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'topics',
          key: 'id',
        },
      },
      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      framework: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sonarKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'repos',
      modelName: 'repos',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
          },
          {
            model: TopicModel.scope('withDetails'),
            as: 'topic',
            paranoid: false, // Hiển thị cả topic đã bị xóa mềm
          },
        ],
      },
      scopes: {
        withActiveTopic: {
          include: [
            {
              model: UserModel,
              as: 'author',
            },
            {
              model: TopicModel,
              as: 'topic',
              // Chỉ hiển thị topic chưa bị xóa mềm (paranoid: true - default)
            },
          ],
        },
        withAllTopics: {
          include: [
            {
              model: UserModel,
              as: 'author',
            },
            {
              model: TopicModel,
              as: 'topic',
              paranoid: false, // Hiển thị cả topic đã bị xóa mềm
            },
          ],
        },
      },
    },
  );

  return ReposModel;
}
