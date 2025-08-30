import { ResponseAPIDto } from '@/interfaces/common';
import { IMemberContributors } from '@/interfaces/user';
import reposService from '@/services/repos.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Repos_GetContributors({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IMemberContributors[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['repos', 'contributors', id],
    queryFn: async () => {
      const res = await reposService.getContributors(id);
      return res;
    },
    ...options,
  });

  return query;
}
