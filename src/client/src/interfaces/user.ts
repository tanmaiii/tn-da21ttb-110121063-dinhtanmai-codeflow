import { IBaseEntity, IGetAllQuery } from './common';
import { IStats } from './topic';

export interface IUser extends IBaseEntity {
  id: string;
  name: string;
  uid?: string;
  username: string;
  email: string;
  avatar?: string;
  password?: string;
  status?: 'active' | 'inactive';
  role: string;
  bio?: string;
}

export interface IUserSetting extends IUser{
  settings: IUserSettings;
}

export interface IUserCreate {
  name: string;
  username: string;
  email: string;
  password?: string;
  role: string;
}

export interface IUserSettings extends IBaseEntity {
  userId: string;
  receiveEmail: boolean;
  receivePush: boolean;
  securityAlerts: boolean;
  projectUpdates: boolean;
  onlineStatus: boolean;
  warningLogin: boolean;
}

export interface IMemberContributors extends IStats {
  authorId: string;
  author?: IUser;
}

export interface IGetUserAllQuery extends IGetAllQuery {
  role?: string;
}