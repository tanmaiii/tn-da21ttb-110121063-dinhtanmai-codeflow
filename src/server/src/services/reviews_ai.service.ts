import { DB } from '@/database';
import { ReviewAI, ReviewAiCreate } from '@/interfaces/reviews_ai.interface';
import { Service } from 'typedi';

@Service()
export class ReviewsAIService {
  public async createReviewAI(reviewAI: ReviewAiCreate): Promise<ReviewAI> {
    const data = {
      ...reviewAI,
      comments: JSON.stringify(reviewAI.comments),
    };
    const newReviewAI = await DB.ReviewsAI.create(data);
    return newReviewAI;
  }
}
