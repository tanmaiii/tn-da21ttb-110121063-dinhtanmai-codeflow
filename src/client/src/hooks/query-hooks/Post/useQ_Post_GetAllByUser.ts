import {
    IGetAllQuery,
    PaginatedResponseAPIDto,
  } from "@/interfaces/common";
  import { IPost } from "@/interfaces/post";
  import postService from "@/services/post.service";
  import { useQuery, UseQueryOptions } from "@tanstack/react-query";
  
  export default function useQ_Post_GetAllByUser({
    options,
    params,
    userId,
  }: {
    options?: Partial<
      UseQueryOptions<PaginatedResponseAPIDto<IPost[]>, Error>
    >;
    params: IGetAllQuery;
    userId: string;
  }) {
    const query = useQuery({
      queryKey: ["posts", params, userId],
      queryFn: async () => {
        const res = postService.getAllByUser(params, userId);
        return res;
      },
      ...options,
    });
  
    return query;
  }
  