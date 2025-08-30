import { PostLike } from '@/interfaces/posts.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type PostLikeCreationAttributes = Optional<PostLike, 'id' | 'userId' | 'postId'>;

export class PostLikeModel extends Model<PostLike, PostLikeCreationAttributes> implements PostLike {
  public id!: string;
  public userId!: string;
  public postId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PostLikeModel {
  PostLikeModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      postId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'post_likes',
      modelName: 'post_likes',
      sequelize,
      timestamps: true,
    },
  );

  return PostLikeModel;
}
