import {
    ResponseAPIDto
} from "@/interfaces/common";
import postService from "@/services/post.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Post_CheckLike({
  options,
  id,
}: {
  options?: Partial<
    UseQueryOptions<ResponseAPIDto<{ isLike: boolean }>, Error>
  >;
  id: string;
}) {
  const query = useQuery({
    queryKey: ["post", "like", id],
    queryFn: async () => {
      const res = await postService.checkLike(id);
      return res;
    },
    ...options,
  });

  return query;
}
