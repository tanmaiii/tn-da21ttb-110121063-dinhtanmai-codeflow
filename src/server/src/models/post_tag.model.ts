import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { PostTag } from '@/interfaces/tags.interface';

export type PostTagCreationAttributes = Optional<PostTag, 'id' | 'tagId' | 'postId'>;

export class PostTagModel extends Model<PostTag, PostTagCreationAttributes> implements PostTag {
  public id!: string;
  public tagId: string;
  public postId: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PostTagModel {
  PostTagModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tagId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'tags',
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
      },
    },
    {
      tableName: 'post_tags',
      modelName: 'post_tags',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );

  return PostTagModel;
}
