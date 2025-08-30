import { ReviewAI } from '@/interfaces/reviews_ai.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserModel } from './users.model';

type ReviewAICreationAttributes = Optional<ReviewAI, 'id' | 'pullRequestId' | 'authorId' | 'summany' | 'score' | 'comments'>;

export class ReviewAIModel extends Model<ReviewAI, ReviewAICreationAttributes> implements ReviewAI {
  public id: string;
  public pullRequestId: string;
  public authorId: string;
  public summany: string;
  public score: number;
  public comments: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ReviewAIModel {
  ReviewAIModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      pullRequestId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'pull_requests',
          key: 'id',
        },
      },
      authorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      summany: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      score: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comments: {
        allowNull: false,
        type: DataTypes.JSON,
      },
    },
    {
      tableName: 'reviews_ai',
      modelName: 'reviews_ai',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
      scopes: {
        withAuthor: {
          include: [
            {
              model: UserModel,
              as: 'author',
            },
          ],
        },
      },
    },
  );

  return ReviewAIModel;
}
