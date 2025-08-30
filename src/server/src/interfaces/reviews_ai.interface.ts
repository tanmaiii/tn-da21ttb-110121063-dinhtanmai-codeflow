export interface ReviewAI {
  id: string;
  pullRequestId: string;
  authorId: string;
  summany: string;
  score: number;
  comments: string; //json
}

export interface ReviewAIComment {
  file: string;
  line: number;
  comment: string;
}

export interface ReviewAiCreate {
  pullRequestId: string;
  authorId: string;
  summany: string;
  score: number;
  comments: ReviewAIComment[];
}
