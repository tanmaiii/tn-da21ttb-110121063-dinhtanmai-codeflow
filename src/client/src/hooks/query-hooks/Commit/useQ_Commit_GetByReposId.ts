'use client';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICommit, ICommitQueryParams } from '@/interfaces/repos';
import commitService from '@/services/commit.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Commit_GetByReposId({
  options,
  params,
  reposId,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ICommit[]>, Error>>;
  params: ICommitQueryParams;
  reposId: string;
}) {
  const query = useQuery({
    queryKey: ['commit', params],
    queryFn: async () => {
      const res = commitService.getByReposId(params, reposId);
      return res;
    },
    ...options,
  });

  return query;
}
