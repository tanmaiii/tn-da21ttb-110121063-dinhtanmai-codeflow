import { GithubMeta } from '@/interfaces/github';
import githubService from '@/services/github.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_GitHub_GetRepoInfo({
  repoName,
  options,
}: {
  repoName: string;
  options?: Partial<UseQueryOptions<GithubMeta, Error>>;
}) {
  return useQuery({
    queryKey: ['github', 'repo', repoName],
    queryFn: async () => {
      const res = await githubService.getRepoInfo(repoName);
      return res.data;
    },
    ...options,
  });
}
