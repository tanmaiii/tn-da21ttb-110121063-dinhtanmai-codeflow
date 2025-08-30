import {
    IGetAllQuery,
    PaginatedResponseAPIDto,
  } from "@/interfaces/common";
  import { IPost } from "@/interfaces/post";
  import postService from "@/services/post.service";
  import { useQuery, UseQueryOptions } from "@tanstack/react-query";
  
  export default function useQ_Post_GetAllByTag({
    options,
    params,
    tagId,
  }: {
    options?: Partial<
      UseQueryOptions<PaginatedResponseAPIDto<IPost[]>, Error>
    >;
    params: IGetAllQuery;
    tagId: string;
  }) {
    const query = useQuery({
      queryKey: ["posts", params, tagId],
      queryFn: async () => {
        const res = postService.getAllByTag(params, tagId);
        return res;
      },
      ...options,
    });
  
    return query;
  }
  