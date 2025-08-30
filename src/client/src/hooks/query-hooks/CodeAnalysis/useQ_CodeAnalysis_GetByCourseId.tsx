import { ITopicMetrics } from '@/interfaces/code_analysis';
import { ResponseAPIDto } from '@/interfaces/common';
import codeAnalysisService from '@/services/code_analysis.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQ_CodeAnalysis_GetByCourseId = (
  courseId: string,
  options?: UseQueryOptions<ResponseAPIDto<ITopicMetrics[]>, Error>,
) => {
  const query = useQuery({
    queryKey: ['code-analysis', 'course', courseId, 'timeframe'],
    queryFn: async () => {
      const res = await codeAnalysisService.getByCourseId(courseId);
      return res;
    },
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
};
