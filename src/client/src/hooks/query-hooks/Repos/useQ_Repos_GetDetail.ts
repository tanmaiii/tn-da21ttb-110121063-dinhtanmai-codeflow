import { ResponseAPIDto } from '@/interfaces/common';
import { IRepos } from '@/interfaces/repos';
import reposService from '@/services/repos.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Repos_GetDetail({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IRepos>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['repos', 'detail', id],
    queryFn: async () => {
      const res = await reposService.getDetail(id);
      return res;
    },
    ...options, 
  });

  return query;
}
