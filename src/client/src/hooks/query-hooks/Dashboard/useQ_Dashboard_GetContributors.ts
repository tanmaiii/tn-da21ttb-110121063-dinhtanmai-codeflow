import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { IMemberContributors } from '@/interfaces/user';
import dashboardService from '@/services/dashboard.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook lấy danh sách trạng thái đề tài
 * @param options: options cho useQuery
 * @returns: danh sách trạng thái đề tài
 */
export default function useQ_Dashboard_GetContributors({
  params,
  options,
}: {
  params: IGetAllQuery;
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IMemberContributors[]>, Error>>;
}) {
  return useQuery({
    queryKey: ['dashboard', 'dashboard'],
    queryFn: async () => {
      const response = await dashboardService.getContributors(params);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
