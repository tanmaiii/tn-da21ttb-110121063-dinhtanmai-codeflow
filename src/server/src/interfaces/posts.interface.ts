export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  thumbnail?: string;
  status: boolean;
}

export interface PostLike {
  id: string;
  postId: string;
  userId: string;
}

export interface PostCreate {
  title: string;
  content: string;
  authorId: string;
  thumbnail?: string;
  status?: boolean;
  tags?: Array<string> | null;
}
