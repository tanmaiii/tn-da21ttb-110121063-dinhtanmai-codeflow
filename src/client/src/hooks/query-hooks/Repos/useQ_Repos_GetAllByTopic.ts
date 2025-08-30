import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { IRepos } from '@/interfaces/repos';
import reposService from '@/services/repos.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Repos_GetAllByTopic({
  options,
  params,
  topicId,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IRepos[]>, Error>>;
  params: IGetAllQuery;
  topicId: string;
}) {
  const query = useQuery({
    queryKey: ['repos', topicId, params],
    queryFn: async () => {
      const res = reposService.getByTopic(params, topicId);
      return res;
    },
    ...options,
  });

  return query;
}
