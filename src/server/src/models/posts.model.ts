import { Post } from '@/interfaces/posts.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { TagModel } from './tags.model';
import { UserModel } from './users.model';

type PostCreationAttributes = Optional<Post, 'id' | 'title' | 'content' | 'authorId' | 'thumbnail' | 'status'>;

export class PostModel extends Model<Post, PostCreationAttributes> implements Post {
  public id: string;
  public title: string;
  public content: string;
  public authorId: string;
  public thumbnail?: string;
  public status: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PostModel {
  PostModel.init(
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
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      authorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'posts',
      modelName: 'posts',
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'name', 'username', 'role', 'avatar'], // Replace with actual attribute names of UserModel
          },
          // {
          //   model: CommentModel,
          //   as: 'comments',
          //   attributes: ['id', 'content', 'createdAt'],
          // },
          {
            model: TagModel,
            as: 'tags',
            through: { attributes: [] },
          },
        ],
      },
    },
  );

  return PostModel;
}
