import { ResponseAPIDto } from '@/interfaces/common';
import { IReposFramework } from '@/interfaces/repos';
import reposService from '@/services/repos.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Repos_GetFramework({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IReposFramework[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['repos', 'framework', id],
    queryFn: async () => {
      const res = await reposService.getFramework(id);
      return res;
    },
    ...options,
  });

  return query;
}
