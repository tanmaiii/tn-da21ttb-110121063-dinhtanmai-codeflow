import { ResponseAPIDto } from '@/interfaces/common';
import { ITopicMetrics } from '@/interfaces/code_analysis';
import dashboardService from '@/services/dashboard.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook lấy chỉ số của tất cả các lần đánh giá
 * @param options: options cho useQuery
 */
export default function useQ_Dashboard_GetCodeAnalysis({
  options,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ITopicMetrics[]>, Error>>;
}) {
  return useQuery({
    queryKey: ['dashboard', 'code-analysis'],
    queryFn: async () => {
      const response = await dashboardService.getCodeAnalysis();
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
