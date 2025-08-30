import { ResponseAPIDto } from '@/interfaces/common';
import { IUser } from '@/interfaces/user';
import userService from '@/services/user.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_User_GetMe({
  options,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IUser>, Error>>;
}) {
  const query = useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const res = userService.getMe()
      return res;
    },
    ...options,
  });

  return query;
}
