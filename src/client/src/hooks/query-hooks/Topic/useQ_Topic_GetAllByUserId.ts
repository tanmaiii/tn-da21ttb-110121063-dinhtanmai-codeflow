'use client';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { IGetAllTopicParams, ITopic } from '@/interfaces/topic';
import topicService from '@/services/topic.service';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface ParamsProps extends IGetAllTopicParams {
  userId: string;
}

interface UseQ_Topic_GetAllByUserIdProps {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ITopic[]>, Error>>;
  params: ParamsProps;
}

export default function useQ_Topic_GetAllByUserId({
  options,
  params,
}: UseQ_Topic_GetAllByUserIdProps) {
  const query = useQuery({
    queryKey: ['topics', 'user', params],
    queryFn: () => topicService.getAllByUserId(params, params.userId),
    ...options,
  });

  return query;
}
