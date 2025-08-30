import { ResponseAPIDto } from '@/interfaces/common';
import { ITagWithUsageCount } from '@/interfaces/tags';
import dashboardService from '@/services/dashboard.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook lấy danh sách tags
 * @param options: options cho useQuery
 * @returns: danh sách tags
 */
export default function useQ_Dashboard_GetTags({
  options,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ITagWithUsageCount[]>, Error>>;
}) {
  return useQuery({
    queryKey: ['dashboard', 'tags'],
    queryFn: async () => {
      const response = await dashboardService.getTags();
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
