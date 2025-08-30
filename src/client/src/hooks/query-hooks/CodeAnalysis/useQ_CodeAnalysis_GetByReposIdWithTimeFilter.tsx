import { ICodeAnalysis } from '@/interfaces/code_analysis';
import { ResponseAPIDto } from '@/interfaces/common';
import codeAnalysisService from '@/services/code_analysis.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQ_CodeAnalysis_GetByReposIdWithTimeFilter = (
  reposId: string,
  timeframe: string,
  options?: UseQueryOptions<ResponseAPIDto<ICodeAnalysis[]>, Error>,
) => {
  const query = useQuery({
    queryKey: ['code-analysis', 'repos', reposId, 'timeframe', timeframe],
    queryFn: async () => {
      const res = await codeAnalysisService.getByReposIdWithTimeFilter(reposId, timeframe);
      return res;
    },
    enabled: !!reposId && !!timeframe,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
};
