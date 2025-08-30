import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICourse } from '@/interfaces/course';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Post_GetAllByTag({
  options,
  params,
  tagId,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ICourse[]>, Error>>;
  params: IGetAllQuery;
  tagId: string;
}) {
  const query = useQuery({
    queryKey: ['courses', params, tagId],
    queryFn: async () => {
      const res = courseService.getAllByTag(params, tagId);
      return res;
    },
    ...options,
  });

  return query;
}
