import {
  IGetAllQuery,
  PaginatedResponseAPIDto,
} from "@/interfaces/common";
import { IPost } from "@/interfaces/post";
import postService from "@/services/post.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Post_GetAll({
  options,
  params,
}: {
  options?: Partial<
    UseQueryOptions<PaginatedResponseAPIDto<IPost[]>, Error>
  >;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ["posts", params],
    queryFn: async () => {
      const res = postService.getAll(params);
      return res;
    },
    ...options,
  });

  return query;
}
