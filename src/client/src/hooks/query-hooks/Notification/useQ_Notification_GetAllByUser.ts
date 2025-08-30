import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { INotification } from '@/interfaces/notification';
import notificationService from '@/services/notification.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface GetAllByUserParams extends IGetAllQuery {
  isRead?: boolean;
}

export default function useQ_Notification_GetAllByUser({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<INotification[]>, Error>>;
  params: GetAllByUserParams;
}) {
  const query = useQuery({
    queryKey: ['notifications', 'user', params],
    queryFn: async () => {
      const res = notificationService.getAllByUser(params);
      return res;
    },
    ...options,
  });

  return query;
}
