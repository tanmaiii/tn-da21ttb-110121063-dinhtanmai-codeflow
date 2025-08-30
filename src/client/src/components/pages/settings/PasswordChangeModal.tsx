import ActionModal from '@/components/common/Action/ActionModal';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
    changePasswordSchemaType,
    useChangePasswordSchema,
} from '@/lib/validations/changePasswordSchema';
import authService from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import PasswordInput from '../../common/Input/PasswordInput/PasswordInput';

export default function PasswordChangeModal() {
  const schema = useChangePasswordSchema();
  const buttonCloseRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
  } = useForm<changePasswordSchemaType>({
    resolver: zodResolver(schema),
  });

  const mutationSubmit = useMutation({
    mutationFn: async (data: changePasswordSchemaType) => {
      const res = await authService.changePassword(data);
      return res.data;
    },
    onSuccess: () => {
      reset();
      toast.success('Password changed successfully');
      buttonCloseRef.current?.click();
    },
    onError: (err: unknown) => {
      reset();
      buttonCloseRef.current?.click();
      toast.error((err as Error)?.message || 'Change password is error');
    },
  });

  return (
    <ActionModal
      title={'Change password'}
      actionType={'non-icon'}
      className="max-w-[600px]"
      icon={
        <Button className="h-12" variant="default">
          {t('common.update')}
        </Button>
      }
    >
      <form
        onSubmit={handleSubmit(data => mutationSubmit.mutate(data))}
        className="pt-4 flex gap-4 flex-col"
      >
        <PasswordInput
          label={t('settings.currentPassword')}
          name={'currentPassword'}
          registration={register('currentPassword')}
          error={errors.currentPassword?.message}
        />
        <PasswordInput
          label={t('settings.newPassword')}
          name={'newPassword'}
          registration={register('newPassword')}
          error={errors.newPassword?.message}
        />
        <PasswordInput
          registration={register('confirmPassword')}
          label={t('settings.confirmNewPassword')}
          name={'confirmPassword'}
          error={errors.confirmPassword?.message}
        />

        <div className="flex gap-2 justify-end">
          <DialogClose asChild>
            <Button ref={buttonCloseRef} variant="outline">
              {t('common.cancel')}
            </Button>
          </DialogClose>

          <Button type="submit" className="w-30" disabled={isSubmitting}>
            {isSubmitting ? t('common.loading') : t('common.update')}
          </Button>
        </div>
      </form>
    </ActionModal>
  );
}
