import { ResponseAPIDto } from '@/interfaces/common';
import { IReposFramework } from '@/interfaces/repos';
import dashboardService from '@/services/dashboard.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook lấy danh sách framework
 * @param options: options cho useQuery
 * @returns: danh sách framework
 */
export default function useQ_Dashboard_GetFramework({
  options,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IReposFramework[]>, Error>>;
}) {
  return useQuery({
    queryKey: ['dashboard', 'framework'],
    queryFn: async () => {
      const response = await dashboardService.getFramework();
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
