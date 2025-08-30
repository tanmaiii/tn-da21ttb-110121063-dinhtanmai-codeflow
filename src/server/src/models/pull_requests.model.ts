import { PullRequests } from '@/interfaces/pull_requests.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { ReviewAIModel } from './reviews_ai.model';
import { UserModel } from './users.model';

type PullRequestsCreationAttributes = Optional<
  PullRequests,
  'id' | 'reposId' | 'pullNumber' | 'title' | 'body' | 'authorId' | 'headBranch' | 'baseBranch' | 'commitCount' | 'additions' | 'deletions' | 'status'
>;

export class PullRequestsModel extends Model<PullRequests, PullRequestsCreationAttributes> implements PullRequests {
  public id: string;
  public reposId: string;
  public pullNumber: number;
  public title: string;
  public body: string;
  public authorId: string;
  public headBranch: string;
  public baseBranch: string;
  public commitCount: number;
  public additions: number;
  public deletions: number;
  public status: 'open' | 'closed' | 'merged';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PullRequestsModel {
  PullRequestsModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      reposId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'repos',
          key: 'id',
        },
      },
      pullNumber: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      headBranch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      baseBranch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commitCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      additions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deletions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mergedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      closedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'pull_requests',
      modelName: 'pull_requests',
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
          },
          // {
          //   model: ReviewAIModel,
          //   as: 'reviewsAI',
          // },
        ],
      },
    },
  );

  return PullRequestsModel;
}
