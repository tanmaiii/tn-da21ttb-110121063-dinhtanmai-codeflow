import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { IGetAllTopicParams, ITopicEvaluation } from '@/interfaces/topic';
import topicEvaluationService from '@/services/topic_evaluation.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Evaluation_GetAllByTopic({
  topicId,
  options,
  params,
}: {
  topicId: string;
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ITopicEvaluation[]>, Error>>;
  params: IGetAllTopicParams;
}) {
  const query = useQuery({
    queryKey: ['evaluations', 'topic', topicId, params],
    queryFn: async () => {
      const res = await topicEvaluationService.getAllByTopicId(topicId, params);
      return res;
    },
    ...options,
  });

  return query;
}
