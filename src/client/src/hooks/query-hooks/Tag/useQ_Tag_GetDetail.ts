import { ResponseAPIDto } from '@/interfaces/common';
import { ITag } from '@/interfaces/tags';
import tagService from '@/services/tag.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Tag_GetDetail({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ITag>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['tags', 'detail', id],
    queryFn: async () => {
      const res = tagService.getById(id);
      return res;
    },
    ...options,
  });

  return query;
}
