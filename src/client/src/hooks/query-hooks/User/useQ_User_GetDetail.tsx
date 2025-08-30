import { ResponseAPIDto } from '@/interfaces/common';
import { IUserSetting } from '@/interfaces/user';
import userService from '@/services/user.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_User_GetDetail({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IUserSetting>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = userService.getById(id);
      return res;
    },
    ...options,
  });

  return query;
}
