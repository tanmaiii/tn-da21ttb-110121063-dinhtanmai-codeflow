import {
  ResponseAPIDto
} from "@/interfaces/common";
import { ICourse } from "@/interfaces/course";
import courseService from "@/services/course.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Course_GetDetail({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ICourse>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ["courses", "detail", id],
    queryFn: async () => {
      const res = courseService.getById(id);
      return res;
    },
    ...options,
  });

  return query;
}
