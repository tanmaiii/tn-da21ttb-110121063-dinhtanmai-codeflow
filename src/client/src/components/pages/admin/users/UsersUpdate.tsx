import ActionModal from '@/components/common/Action/ActionModal';
import PasswordInput from '@/components/common/Input/PasswordInput/PasswordInput';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import MySelect from '@/components/common/MySelect';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { ROLE } from '@/constants/enum';
import { ROLE_USER } from '@/constants/object';
import { IUser } from '@/interfaces/user';
import { UserUpdateSchemaType, useUserSchema } from '@/lib/validations/userSchema';
import userService from '@/services/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function UsersUpdate({ user }: { user: IUser }) {
  const tCommon = useTranslations('common');
  const t = useTranslations('users');
  const schema = useUserSchema();
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserUpdateSchemaType>({
    resolver: zodResolver(schema.userSchema),
    defaultValues: user,
  });

  // Reset form when user prop changes
  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: (data: UserUpdateSchemaType) => {
      const updateData = { ...data, id: user.id };
      if (!updateData.password) {
        delete updateData.password;
      }
      return userService.update(user.id, updateData);
    },
    onSuccess: () => {
      toast.success(tCommon('updateSuccess'));
      closeRef.current?.click();
      // Force refetch to get updated data
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error(tCommon('updateError'));
    },
  });

  return (
    <ActionModal title={t('updateUser')} actionType={'update'}>
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="flex flex-col gap-3">
        <TextInput label={t('name')} error={errors.name?.message} {...register('name')} />
        <TextInput
          label={t('username')}
          error={errors.username?.message}
          {...register('username')}
        />
        <TextInput label={t('email')} error={errors.email?.message} {...register('email')} />
        <MySelect
          label={t('role')}
          name="role"
          control={control}
          options={ROLE_USER.filter(item => {
            if (!user.uid) {
              return item.value !== ROLE.USER;
            }
            return item;
          })}
          error={errors.role}
          required={true}
        />
        <PasswordInput
          registration={register('password')}
          label={t('password')}
          description="Để rỗng nếu không có thay đổi"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild ref={closeRef}>
            <Button type="button" variant="outline">
              {tCommon('cancel')}
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {tCommon('update')}
          </Button>
        </div>
      </form>
    </ActionModal>
  );
}
