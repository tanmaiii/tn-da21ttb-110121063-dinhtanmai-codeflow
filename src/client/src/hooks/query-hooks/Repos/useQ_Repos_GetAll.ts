import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { IRepos } from '@/interfaces/repos';
import reposService from '@/services/repos.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Repos_GetAll({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IRepos[]>, Error>>;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ['repos', params],
    queryFn: async () => {
      const res = await reposService.getAll(params);
      return res;
    },
    ...options,
  });

  return query;
}
