export interface GeminiConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface CodeChange {
  file: string;
  start_line: number;
  code: string;
}

export interface GeminiResReviewPR {
  summary: string;
  score: number;
  comments: {
    file: string;
    line: number;
    comment: string;
  }[];
}
