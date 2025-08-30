import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { IMemberContributors } from '@/interfaces/user';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_Contributors({
  options,
  id,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IMemberContributors[]>, Error>>;
  id: string;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ['course', 'contributors', id, params],
    queryFn: async () => {
      const res = await courseService.getContributors(id, params);
      return res;
    },
    ...options,
  });

  return query;
}
