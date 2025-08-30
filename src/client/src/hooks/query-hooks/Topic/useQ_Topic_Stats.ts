import { ResponseAPIDto } from '@/interfaces/common';
import { ITopicDetailStats } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Topic_Stats({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ITopicDetailStats>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['repos', 'stats', id],
    queryFn: async () => {
      const res = await topicService.getStats(id);
      return res;
    },
    ...options,
  });

  return query;
}
