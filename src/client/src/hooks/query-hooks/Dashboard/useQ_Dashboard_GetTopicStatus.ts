import { ResponseAPIDto } from '@/interfaces/common';
import { ITopicStatus } from '@/interfaces/topic';
import dashboardService from '@/services/dashboard.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook lấy danh sách trạng thái đề tài
 * @param options: options cho useQuery
 * @returns: danh sách trạng thái đề tài
 */
export default function useQ_Dashboard_GetTopicStatus({
  options,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ITopicStatus>, Error>>;
}) {
  return useQuery({
    queryKey: ['dashboard', 'topic-status'],
    queryFn: async () => {
      const response = await dashboardService.getTopicStatus();
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
