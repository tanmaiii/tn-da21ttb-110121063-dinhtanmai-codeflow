import { ResponseAPIDto } from '@/interfaces/common';
import { ITopicContributors } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Topic_Contributors({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ITopicContributors[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['topic', 'contributors', id],
    queryFn: async () => {
      const res = await topicService.getContributors(id);
      return res;
    },
    ...options,
  });

  return query;
}
