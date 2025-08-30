import { ITopicMetrics } from '@/interfaces/code_analysis';
import { ResponseAPIDto } from '@/interfaces/common';
import codeAnalysisService from '@/services/code_analysis.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQ_CodeAnalysis_GetByTopicId = (
  topicId: string,
  options?: UseQueryOptions<ResponseAPIDto<ITopicMetrics[]>, Error>,
) => {
  const query = useQuery({
    queryKey: ['code-analysis', 'topic', topicId, 'timeframe'],
    queryFn: async () => {
      const res = await codeAnalysisService.getByTopicId(topicId);
      return res;
    },
    enabled: !!topicId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
};
