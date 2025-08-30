'use client'
import { IGetAllQuery, PaginatedResponseAPIDto } from "@/interfaces/common";
import { IUser } from "@/interfaces/user";
import userService from "@/services/user.service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_User_GetAllStudent({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IUser[]>, Error>>;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ["students", params],
    queryFn: async () => {
      const res = userService.getAllStudent(params);
      return res;
    },
    ...options,
  });

  return query;
}
