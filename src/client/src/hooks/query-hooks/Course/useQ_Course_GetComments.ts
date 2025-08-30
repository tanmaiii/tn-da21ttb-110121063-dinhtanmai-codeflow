import { IComment } from '@/interfaces/comment';
import { ResponseAPIDto } from '@/interfaces/common';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_GetComments({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IComment[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['course', 'comments', id],
    queryFn: async () => {
      const res = courseService.comments(id);
      return res;
    },
    ...options,
  });

  return query;
}
