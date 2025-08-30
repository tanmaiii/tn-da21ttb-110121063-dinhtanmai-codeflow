import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { TopicTag } from '@/interfaces/tags.interface';

export type TopicTagCreationAttributes = Optional<TopicTag, 'id' | 'tagId' | 'topicId'>;

export class TopicTagModel extends Model<TopicTag, TopicTagCreationAttributes> implements TopicTag {
  public id!: string;
  public tagId: string;
  public topicId: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TopicTagModel {
  TopicTagModel.init(
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
      topicId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'topics',
          key: 'id',
        },
      },
    },
    {
      tableName: 'topic_tags',
      modelName: 'topic_tags',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );

  return TopicTagModel;
}
