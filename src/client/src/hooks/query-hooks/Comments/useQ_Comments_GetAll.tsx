'use client'
import { ICommentSimple } from "@/interfaces/comment";
import { IGetAllQuery, PaginatedResponseAPIDto } from "@/interfaces/common";
import commentService from "@/services/comment.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface IGetCourseAllQuery extends IGetAllQuery {
  type?: string;
}

export default function useQ_Comments_GetAll({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ICommentSimple[]>, Error>>;
  params: IGetCourseAllQuery;
}) {
  const query = useQuery({
    queryKey: ["comments", params],
    queryFn: async () => {
      const res = commentService.getAll(params);
      return res;
    },
    ...options,
  });

  return query;
}
