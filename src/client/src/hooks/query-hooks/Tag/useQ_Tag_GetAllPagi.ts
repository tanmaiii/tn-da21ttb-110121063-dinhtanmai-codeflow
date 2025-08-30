'use client'
import { IGetAllQuery, PaginatedResponseAPIDto } from "@/interfaces/common";
import { ITag } from "@/interfaces/tags";
import tagService from "@/services/tag.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Tag_GetAllPagi({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ITag[]>, Error>>;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ["tags", params],
    queryFn: async () => {
      const res = tagService.getAllPagi(params);
      return res;
    },
    ...options,
  });

  return query;
}
