import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { UserSettings } from '@interfaces/user_settings.interface';

export type UserSettingsCreationAttributes = Optional<
  UserSettings,
  'id' | 'userId' | 'receiveEmail' | 'receivePush' | 'securityAlerts' | 'projectUpdates' | 'onlineStatus' | 'warningLogin'
>;

export class UserSettingsModel extends Model<UserSettings, UserSettingsCreationAttributes> implements UserSettings {
  public id!: string;
  public userId!: string;
  public receiveEmail!: boolean;
  public receivePush!: boolean;
  public securityAlerts!: boolean;
  public projectUpdates!: boolean;
  public onlineStatus!: boolean;
  public warningLogin!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserSettingsModel {
  UserSettingsModel.init(
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
      receiveEmail: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      receivePush: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      securityAlerts: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      projectUpdates: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      onlineStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      warningLogin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'user_settings',
      modelName: 'user_settings',
      sequelize,
      timestamps: true,
      paranoid: true,
    },
  );

  return UserSettingsModel;
}
