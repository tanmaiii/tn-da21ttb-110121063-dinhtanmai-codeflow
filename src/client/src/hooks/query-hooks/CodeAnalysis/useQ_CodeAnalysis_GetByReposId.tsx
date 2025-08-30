'use client';
import { ICodeAnalysis, ICodeAnalysisQueryParams } from '@/interfaces/code_analysis';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import codeAnalysisService from '@/services/code_analysis.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_CodeAnalysis_GetByReposId({
  options,
  params,
  reposId,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ICodeAnalysis[]>, Error>>;
  params: ICodeAnalysisQueryParams;
  reposId: string;
}) {
  const query = useQuery({
    queryKey: ['code-analysis', params],
    queryFn: async () => {
      const res = codeAnalysisService.getByReposId(params, reposId);
      return res;
    },
    ...options,
  });

  return query;
}
