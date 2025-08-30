import { IComment } from "@/interfaces/comment";
import { ResponseAPIDto } from "@/interfaces/common";
import postService from "@/services/post.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Post_GetComments({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IComment[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ["post", "comments", id],
    queryFn: async () => {
      const res = postService.comments(id);
      return res;
    },
    ...options,
  });

  return query;
}
