import { ResponseAPIDto } from '@/interfaces/common';
import { ICodeActivity } from '@/interfaces/course';
import dashboardService from '@/services/dashboard.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Dashboard_GetCodeActivity({
  days = 7,
  options,
}: {
  days?: number;
  options?: Partial<UseQueryOptions<ResponseAPIDto<ICodeActivity>, Error>>;
}) {
  return useQuery({
    queryKey: ['dashboard', 'code-activity', days],
    queryFn: async () => {
      const response = await dashboardService.getCodeActivity(days);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
