import { IBaseEntity } from "./common";
import { IUser } from "./user";

export interface ICommentSimple extends IBaseEntity {
  id: string;
  content: string;
  status: boolean;
  postId: string;
  authorId: string;
  parentId?: string;
  submissionId?: string;
  courseId?: string;
  author?: IUser
}

export interface IComment extends IBaseEntity {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  parentId?: string;
  submissionId?: string;
  courseId?: string;
  status?: boolean;
  author?: {
    id: string;
    name: string;
    username?: string;
    role?: string;
    avatar?: string;
  };
  replies: IComment[];
}


export interface ICreatoeCmmentDto {
  content: string;
  postId?: string;
  parentId?: string;
  submissionId?: string;
  courseId?: string;
  status?: boolean;
}