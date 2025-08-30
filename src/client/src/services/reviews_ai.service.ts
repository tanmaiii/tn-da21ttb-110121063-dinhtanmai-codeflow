import { ResponseAPIDto } from '@/interfaces/common';
import { IReviewAIResponse } from '@/interfaces/reviews_ai';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class ReviewsAIService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('reviews-ai');
  }

  async evaluatePullRequestGithub(
    reposId: string,
    prId: string,
  ): Promise<ResponseAPIDto<IReviewAIResponse>> {
    const res = await this.client.get(`/repos/${reposId}/pull-request/${prId}`);
    return res.data;
  }
}

export default new ReviewsAIService() as ReviewsAIService;
