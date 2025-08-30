import { GitHubUser } from '@/interfaces/github';
import githubService from '@/services/github.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_GitHub_GetUserInfo({
  username,
  options,
}: {
  username: string;
  options?: Partial<UseQueryOptions<GitHubUser, Error>>;
}) {
  return useQuery({
    queryKey: ['github', 'info', username],
    queryFn: async () => {
      const res = await githubService.getUserInfo(username);
      return res.data;
    },
    ...options,
  });
}
