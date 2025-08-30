import { Comment } from '@/interfaces/comments.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserModel } from './users.model';

export type CommentCreationAttributes = Optional<Comment, 'id' | 'parentId' | 'status' | 'authorId' | 'postId' | 'courseId' | 'content'>;

export class CommentModel extends Model<Comment, CommentCreationAttributes> implements Comment {
  public id!: string;
  public parentId?: string;
  public authorId!: string;
  // public submissionId?: string;
  public postIds?: string;
  public courseId?: string;
  public content!: string;
  public status?: boolean; // true for active, false for deleted

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommentModel {
  CommentModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      parentId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'comments',
          key: 'id',
        },
      },
      // submissionId: {
      //   allowNull: true,
      //   type: DataTypes.UUID,
      //   references: {
      //     model: 'submissions',
      //     key: 'id',
      //   },
      // },
      authorId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
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
      courseId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'comments',
      modelName: 'comments',
      sequelize,
      timestamps: true,
      paranoid: true,
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'name', 'username', 'role', 'avatar'], // Replace with actual attribute names of UserModel
          },
        ],
      },
    },
  );

  return CommentModel;
}
