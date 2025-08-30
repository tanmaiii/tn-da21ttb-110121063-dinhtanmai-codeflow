'use client';
import IconLoading from '@/components/common/IconLoading/IconLoading';
import PasswordInput from '@/components/common/Input/PasswordInput/PasswordInput';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import {
  resetPasswordSchemaType,
  useResetPasswordSchema,
} from '@/lib/validations/resetPasswordSchema';
import authService from '@/services/auth.service';
import tokenService from '@/services/token.service';
import { useUserStore } from '@/stores/user_store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle, CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ResetPassword() {
  const t = useTranslations('auth');
  const { localPath } = useH_LocalPath();
  const schema = useResetPasswordSchema();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const { user, removeUser } = useUserStore();
  
  useEffect(() => {
    if (user) {
      removeUser();
      tokenService.clearTokens();
    }
  }, [user]);

  useEffect(() => {
    const tokenParam = searchParams?.get('token');
    if (!tokenParam) {
      setError(t('invalidResetToken'));
      return;
    }
    setToken(tokenParam);
  }, [searchParams, t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (body: resetPasswordSchemaType) => {
      if (!token) {
        throw new Error(t('invalidResetToken'));
      }
      const res = await authService.resetPassword({
        token,
        newPassword: body.newPassword,
      });
      return res;
    },
    onError: (err: unknown) => {
      setError((err as Error)?.message || t('error'));
      setSuccess(false);
    },
    onSuccess: () => {
      setSuccess(true);
      setError('');
    },
  });

  if (!token && !error) {
    return (
      <div className="flex flex-col w-full h-fit gap-4 text-center">
        <IconLoading className="mx-auto" />
        <TextDescription>{t('loading')}</TextDescription>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col w-full h-fit gap-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-semibold">{t('passwordResetSuccess')}</h2>
          <TextDescription className="text-base">
            {t('passwordResetSuccessDescription')}
          </TextDescription>
        </div>
        <Link href={localPath(paths.LOGIN)}>
          <Button className="w-full h-12 bg-primary text-white hover:bg-primary/80">
            {t('goToLogin')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-fit gap-0">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">{t('resetPassword')}</h2>
        <TextDescription className="text-base">{t('resetPasswordDescription')}</TextDescription>
      </div>

      {error && (
        <div className="flex flex-row items-center gap-2 text-white text-sm bg-red-400 py-2 px-3 border rounded-md mb-4">
          <CircleAlert style={{ width: '26px', height: '26px' }} />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(value => mutation.mutate(value))}
        className="flex flex-col gap-4"
      >
        <PasswordInput
          id="newPassword"
          label={t('newPassword')}
          registration={register('newPassword')}
          error={errors.newPassword?.message}
          placeholder={t('enterNewPassword')}
        />

        <PasswordInput
          id="confirmPassword"
          label={t('confirmPassword')}
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          placeholder={t('confirmNewPassword')}
        />

        <Button
          disabled={isSubmitting || !token}
          type="submit"
          className="w-full h-12 bg-primary text-white hover:bg-primary/80"
        >
          {isSubmitting ? <IconLoading className="bg-white" /> : t('resetPassword')}
        </Button>
      </form>

      <div className="flex items-center justify-center mt-4">
        <TextDescription className="text-gray-500 dark:text-gray-400">
          {t('rememberPassword')}
        </TextDescription>
        <Link href={localPath(paths.LOGIN)}>
          <TextDescription className="text-primary hover:text-primary/80 cursor-pointer ml-1">
            {t('backToLogin')}
          </TextDescription>
        </Link>
      </div>
    </div>
  );
}
