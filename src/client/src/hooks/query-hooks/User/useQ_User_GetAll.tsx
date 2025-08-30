'use client';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { IGetUserAllQuery, IUser } from '@/interfaces/user';
import userService from '@/services/user.service';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_User_GetAll({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IUser[]>, Error>>;
  params: IGetUserAllQuery;
}) {
  const query = useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const res = userService.getAll(params);
      return res;
    },
    ...options,
  });

  return query;
}
