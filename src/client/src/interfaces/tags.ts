import { IBaseEntity } from "./common";

export interface ITag extends IBaseEntity {
  id: string;
  name: string;
  description?: string;
}

export interface ITagCreateDto {
  name: string;
  description: string;
}

export interface ITagWithUsageCount extends ITag {
  coursesCount: number;
  postsCount: number;
}