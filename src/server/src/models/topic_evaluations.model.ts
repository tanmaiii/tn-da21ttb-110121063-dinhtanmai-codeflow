import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { TopicEvaluations } from '@/interfaces/topics.interface';
import { UserModel } from './users.model';

export type TopicEvaluationsCreationAttributes = Optional<TopicEvaluations, 'id' | 'topicId' | 'userId' | 'evaluation'>;

export class TopicEvaluationsModel extends Model<TopicEvaluations, TopicEvaluationsCreationAttributes> implements TopicEvaluations {
  public id: string;
  public topicId: string;
  public userId: string;
  public evaluation: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TopicEvaluationsModel {
  TopicEvaluationsModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      topicId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'topics',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      evaluation: {
        allowNull: false,
        type: DataTypes.STRING(300),
      },
    },
    {
      tableName: 'topic_evaluations',
      modelName: 'topic_evaluations',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'user',
          },
        ],
      },
    },
  );

  return TopicEvaluationsModel;
}
