'use client';
import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { ITopicStats } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseQ_Topic_GetAllStatsByCourseIdProps {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ITopicStats[]>, Error>>;
  params: IGetAllQuery;
  courseId: string;
}

export default function useQ_Topic_GetAllStatsByCourseId({
  options,
  params,
  courseId,
}: UseQ_Topic_GetAllStatsByCourseIdProps) {
  const query = useQuery({
    queryKey: ['topics', 'course', 'stats', params],
    queryFn: () => topicService.getAllStatsByCourseId(params, courseId),
    ...options,
  });

  return query;
}
