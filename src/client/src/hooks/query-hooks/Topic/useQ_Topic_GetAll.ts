'use client';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { ITopic, IGetAllTopicParams } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Topic_GetAll({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ITopic[]>, Error>>;
  params: IGetAllTopicParams;
}) {
  const query = useQuery({
    queryKey: ['topics', params],
    queryFn: async () => {
      const res = topicService.getAll(params);
      return res;
    },
    ...options,
  });

  return query;
}
