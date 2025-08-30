'use client'
import { IUserSettings } from "@/interfaces/user";
import settingsService from "@/services/settings.service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Settings_GetMe({
  options,
}: { options?: Partial<UseQueryOptions<IUserSettings, Error>> } = {}) {
  const query = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await settingsService.getMe();
      return res.data;
    },
    ...options,
  });

  return query;
}
