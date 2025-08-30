import { ResponseAPIDto } from '@/interfaces/common';
import { ICourseType } from '@/interfaces/course';
import dashboardService from '@/services/dashboard.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook lấy số lượng loại khóa học
 * @param options: options cho useQuery
 */
export default function useQ_Dashboard_GetCourseTypes({
  options,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ICourseType[]>, Error>>;
}) {
  return useQuery({
    queryKey: ['dashboard', 'course-types'],
    queryFn: async () => {
      const response = await dashboardService.getCourseTypes();
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
