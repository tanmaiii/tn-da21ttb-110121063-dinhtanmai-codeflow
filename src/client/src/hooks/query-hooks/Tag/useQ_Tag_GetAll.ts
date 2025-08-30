'use client'
import { ResponseAPIDto } from "@/interfaces/common";
import { ITag } from "@/interfaces/tags";
import tagService from "@/services/tag.service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Tag_GetAll({
  options,
}: { options?: Partial<UseQueryOptions<ResponseAPIDto<ITag[]>, Error>> } = {}) {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = tagService.getAll();
      return res;
    },
    ...options,
  });

  return query;
}
