'use client';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { IGetAllTopicParams, ITopic } from '@/interfaces/topic';
import topicService from '@/services/topic.service';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseQ_Topic_GetAllByTeacherIdProps {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ITopic[]>, Error>>;
  params: IGetAllTopicParams;
  userId: string;
}

export default function useQ_Topic_GetAllByTeacherId({
  options,
  params,
  userId,
}: UseQ_Topic_GetAllByTeacherIdProps) {
  const query = useQuery({
    queryKey: ['topics', 'teacher', userId, params],
    queryFn: () => topicService.getAllByTeacherId(params, userId),
    ...options,
  });

  return query;
}
