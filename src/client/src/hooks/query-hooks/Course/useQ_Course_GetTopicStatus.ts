import { ResponseAPIDto } from '@/interfaces/common';
import { ITopicStatus } from '@/interfaces/topic';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook lấy danh sách trạng thái đề tài
 * @param options: options cho useQuery
 * @returns: danh sách trạng thái đề tài
 */
export default function useQ_Course_GetTopicStatus({
  options,
  courseId,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ITopicStatus>, Error>>;
  courseId: string;
}) {
  return useQuery({
    queryKey: ['courses', 'topic-status', courseId],
    queryFn: async () => {
      const response = await courseService.getTopicStatus(courseId);
      return response;
    },
    ...options,
  });
}
