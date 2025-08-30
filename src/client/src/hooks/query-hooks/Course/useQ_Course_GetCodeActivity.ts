import { ResponseAPIDto } from '@/interfaces/common';
import { ICodeActivity } from '@/interfaces/course';
import CourseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_GetCodeActivity({ 
  courseId, 
  days = 7, 
  options
}: {
  courseId: string;
  days?: number;
  options?: Partial<UseQueryOptions<ResponseAPIDto<ICodeActivity>, Error>>;
}) {
  return useQuery({
    queryKey: ['courses', 'code-activity', courseId, days],
    queryFn: async () => {
      const response = await CourseService.getCodeActivity(courseId, days);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    ...options,
  });
}
