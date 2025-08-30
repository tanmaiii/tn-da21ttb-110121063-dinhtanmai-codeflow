export interface Comment {
  id: string;
  content: string;
  // submissionId?: string;
  authorId: string;
  postId?: string;
  courseId?: string;
  parentId?: string; // Id cha
  status?: boolean; // true for active, false for deleted
}
