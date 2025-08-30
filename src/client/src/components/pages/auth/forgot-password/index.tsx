'use client';
import IconLoading from '@/components/common/IconLoading/IconLoading';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import {
    forgotPasswordSchemaType,
    useForgotPasswordSchema,
} from '@/lib/validations/forgotPasswordSchema';
import authService from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCheck } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ForgotPassword() {
  const t = useTranslations('auth');
  const { localPath } = useH_LocalPath();
  const schema = useForgotPasswordSchema();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (body: forgotPasswordSchemaType) => {
      const res = await authService.forgotPassword(body);
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

  if (success) {
    return (
      <div className="flex flex-col w-full h-fit gap-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex fle-row gap-2 items-center">
            <IconCheck className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-semibold">{t('emailSent')}</h2>
          </div>
          <TextDescription className="text-base">{t('checkEmailForResetLink')}</TextDescription>
        </div>
        <Link href={localPath(paths.LOGIN)}>
          <Button className="w-full h-12 bg-primary text-white hover:bg-primary/80">
            {t('backToLogin')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-fit gap-0">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{t('forgotPassword')}</h2>
        <TextDescription className="text-base">{t('forgotPasswordDescription')}</TextDescription>
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
        <TextInput
          id="email"
          label={t('email')}
          registration={register('email')}
          error={errors.email?.message}
          placeholder={t('enterYourEmail')}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full h-12 bg-primary text-white hover:bg-primary/80"
        >
          {isSubmitting ? <IconLoading className="bg-white" /> : t('sendResetLink')}
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
