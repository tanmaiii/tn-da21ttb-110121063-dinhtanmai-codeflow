import { ENUM_TOPIC_STATUS } from '@/data/enum';
import { Topic } from '@interfaces/topics.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { CourseModel } from './courses.model';
import { ReposModel } from './repos.model';
import { TagModel } from './tags.model';
import { TopicMemberModel } from './topic_member.model';
import { UserModel } from './users.model';
type PostCreationAttributes = Optional<Topic, 'id' | 'title' | 'description' | 'courseId' | 'authorId' | 'isCustom' | 'status' | 'groupName'>;

export class TopicModel extends Model<Topic, PostCreationAttributes> implements Topic {
  public id!: string;
  public title!: string;
  public description!: string;
  public courseId!: string;
  public authorId!: string;
  public isCustom!: boolean;
  public status!: ENUM_TOPIC_STATUS;
  public groupName!: string;

  // Relations
  public repos?: ReposModel[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TopicModel {
  TopicModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      courseId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      authorId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      isCustom: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(ENUM_TOPIC_STATUS)),
        defaultValue: ENUM_TOPIC_STATUS.PENDING,
      },
      groupName: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      tableName: 'topics',
      modelName: 'topics',
      timestamps: true,
      paranoid: true, // bật xóa mềm
      scopes: {
        withDetails: {
          include: [
            {
              model: UserModel,
              as: 'author',
            },
            {
              model: TagModel,
              as: 'tags',
              through: { attributes: [] },
            },
            {
              model: CourseModel,
              as: 'course',
              attributes: {
                exclude: ['description'],
              },
            },
            {
              model: TopicMemberModel,
              as: 'members',
              include: [
                {
                  model: UserModel,
                  as: 'user',
                },
              ],
            },
          ],
        },
      },
    },
  );

  return TopicModel;
}
