import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICourseMembers } from '@/interfaces/course';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_GetMembers({
  options,
  params,
  id,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ICourseMembers[]>, Error>>;
  params: IGetAllQuery;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['courses', 'members', id, params],
    queryFn: () => {
      const res = courseService.memberInCourse(id, params);
      console.log(res);
      return res;
    },
    ...options,
  });

  return query;
}
