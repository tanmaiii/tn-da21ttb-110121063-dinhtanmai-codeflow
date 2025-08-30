import {
  ResponseAPIDto
} from "@/interfaces/common";
import { IPost } from "@/interfaces/post";
import postService from "@/services/post.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Post_GetDetail({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IPost>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ["posts", "detail", id],
    queryFn: async () => {
      const res = postService.getById(id);
      return res;
    },
    ...options,
  });

  return query;
}
