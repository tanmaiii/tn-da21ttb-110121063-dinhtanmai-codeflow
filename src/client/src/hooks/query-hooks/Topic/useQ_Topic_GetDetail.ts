import { ResponseAPIDto } from '@/interfaces/common';
import { ITopic } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Topic_GetDetail({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ITopic>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['topic', 'detail', id],
    queryFn: async () => {
      const res = topicService.getById(id);
      return res;
    },
    ...options,
  });

  return query;
}
