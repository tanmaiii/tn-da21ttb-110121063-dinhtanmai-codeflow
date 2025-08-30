import { ResponseAPIDto } from '@/interfaces/common';
import { ICourseStatus } from '@/interfaces/course';
import dashboardService from '@/services/dashboard.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface useQ_Dashboard_GetCourseStatusProps {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ICourseStatus>, Error>>;
}

/**
 * Hook lấy danh sách trạng thái đề tài
 * @param options: options cho useQuery
 * @returns: danh sách trạng thái đề tài
 */
export default function useQ_Dashboard_GetCourseStatus({
  options,
}: useQ_Dashboard_GetCourseStatusProps) {
  return useQuery({
    queryKey: ['dashboard', 'course-status'],
    queryFn: async () => {
      const response = await dashboardService.getCourseStatus();
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
