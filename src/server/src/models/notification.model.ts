import { ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { Notification } from '@/interfaces/notification.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserModel } from './users.model';
import { TopicModel } from './topics.model';
import { CourseModel } from './courses.model';
import { PostModel } from './posts.model';
import { ReposModel } from './repos.model';
type NotificationCreationAttributes = Optional<
  Notification,
  'id' | 'title' | 'message' | 'userId' | 'isRead' | 'link' | 'type' | 'authorId' | 'topicId' | 'courseId' | 'postId' | 'reposId'
>;

export class NotificationModel extends Model<Notification, NotificationCreationAttributes> implements Notification {
  public id: string;
  public title: string;
  public message: string;
  public userId: string;
  public authorId: string;
  public topicId: string;
  public courseId: string;
  public postId: string;
  public reposId: string;
  public isRead: boolean;
  public link: string;
  public type: ENUM_TYPE_NOTIFICATION;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof NotificationModel {
  NotificationModel.init(
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
      message: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        comment: 'ID of the user who receives the notification',
      },
      authorId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        comment: 'ID of the user who created/sent the notification',
      },
      topicId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'topics',
          key: 'id',
        },
      },
      courseId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      postId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      reposId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'repos',
          key: 'id',
        },
      },
      link: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(ENUM_TYPE_NOTIFICATION)),
      },
      isRead: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'notifications',
      modelName: 'notifications',
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
          },
          {
            model: UserModel,
            as: 'user',
          },
          {
            model: TopicModel,
            as: 'topic',
          },
          {
            model: CourseModel,
            as: 'course',
          },
          {
            model: PostModel,
            as: 'post',
          },
          {
            model: ReposModel,
            as: 'repos',
          },
        ],
      },
    },
  );

  return NotificationModel;
}
