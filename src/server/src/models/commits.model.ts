import { Commits } from '@/interfaces/commits.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserModel } from './users.model';

export type CommitsCreationAttributes = Optional<
  Commits,
  'id' | 'reposId' | 'commitSha' | 'message' | 'authorId' | 'additions' | 'deletions' | 'totalChanges' | 'isMerged' | 'branch'
>;

export class CommitsModel extends Model<Commits, CommitsCreationAttributes> implements Commits {
  public id!: string;
  public reposId!: string;
  public commitSha!: string;
  public message!: string;
  public authorId!: string;
  public additions!: number;
  public deletions!: number;
  public totalChanges!: number;
  public isMerged!: boolean;
  public pullRequestId!: string;
  public branch!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommitsModel {
  CommitsModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      reposId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'repos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      commitSha: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      authorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      additions: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      deletions: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalChanges: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isMerged: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      branch: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: 'commits',
      tableName: 'commits',
      timestamps: true,
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
          },
        ],
      },
    },
  );
  return CommitsModel;
}
