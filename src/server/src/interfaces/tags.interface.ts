export interface Tag {
  id: string;
  name: string;
  description: string;
}

export interface CourseTag {
  id: string;
  tagId: string;
  courseId: string;
}

export interface PostTag {
  id: string;
  tagId: string;
  postId: string;
}

export interface TopicTag {
  id: string;
  tagId: string;
  topicId: string;
}
