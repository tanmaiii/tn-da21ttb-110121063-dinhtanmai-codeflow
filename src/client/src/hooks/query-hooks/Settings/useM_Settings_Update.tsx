'use client'
import { IUserSettings } from "@/interfaces/user";
import settingsService from "@/services/settings.service";
import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";

type UpdateSettingsInput = Omit<Partial<IUserSettings>, 'userId' | 'id' | 'createdAt' | 'updatedAt'>;

export default function useM_Settings_Update(
  params: { options?: Partial<UseMutationOptions<IUserSettings, Error, UpdateSettingsInput>> } = {}
) {
  const { options } = params;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateSettingsInput) => {
      const res = await settingsService.updateMe(data as IUserSettings);
      return res.data;
    },
    onSuccess: (data) => {
      // Cập nhật cache ngay lập tức
      queryClient.setQueryData(["settings"], data);
      // Invalidate để refetch nếu cần
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    ...options,
  });

  return mutation;
} 