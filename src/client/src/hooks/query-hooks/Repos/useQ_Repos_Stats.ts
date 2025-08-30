import { ResponseAPIDto } from '@/interfaces/common';
import { IReposStats } from '@/interfaces/repos';
import reposService from '@/services/repos.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Repos_Stats({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IReposStats>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['repos', 'stats', id],
    queryFn: async () => {
      const res = await reposService.getStats(id);
      return res;
    },
    ...options,
  });

  return query;
}
