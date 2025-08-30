import { ResponseAPIDto } from '@/interfaces/common';
import { IReviewAIResponse } from '@/interfaces/reviews_ai';
import ReviewsAIService from '@/services/reviews_ai.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_ReviewsAI_EvaluatePullRequestGithub({
  options,
  reposId,
  prId,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IReviewAIResponse>, Error>>;
  reposId: string;
  prId: string;
}) {
  const query = useQuery({
    queryKey: ['reviews-ai', 'evaluate-pull-request-github', reposId, prId],
    queryFn: async () => {
      const res = await ReviewsAIService.evaluatePullRequestGithub(reposId, prId);
      return res;
    },
    ...options,
  });

  return query;
}
