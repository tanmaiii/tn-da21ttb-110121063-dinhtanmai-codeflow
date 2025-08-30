export interface TopicEvaluations {
  id: string;
  topicId: string;
  evaluatedBy: string;
  score: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
