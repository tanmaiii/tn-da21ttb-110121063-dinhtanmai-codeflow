'use client';
import IconLoading from '@/components/common/IconLoading/IconLoading';
import PasswordInput from '@/components/common/Input/PasswordInput/PasswordInput';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { useRouter } from '@/i18n/navigation';
import { RegisterSchemaType, useRegisterSchema } from '@/lib/validations/registerSchema';
import authService from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import LoginWithGitHub from '../login-with-github';

export default function Register() {
  const t = useTranslations('auth');
  const { localPath } = useH_LocalPath();
  const schema = useRegisterSchema();
  const router = useRouter();
  const isLoading = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (body: RegisterSchemaType) => {
      isLoading[1](true);
      const res = await authService.signup(body);
      return res;
    },
    onError: (err: unknown) => {
      isLoading[1](false);
      toast.error((err as Error)?.message || t('error'));
    },
    onSuccess: () => {
      toast.success(t('signUpSuccess'), {
        action: {
          label: t('signIn'),
          onClick: () => router.push(localPath(paths.LOGIN)),
        },
      });
      isLoading[1](false);
      reset();
    },
  });

  return (
    <div className="flex flex-col w-full h-fit gap-0">
      <TextDescription className="text-left text-base font-light mb-4">
        {t('pleaseSignUp')}
      </TextDescription>
      <form
        onSubmit={handleSubmit(value => mutation.mutate(value))}
        className="flex flex-col gap-3"
      >
        <TextInput
          id="name"
          label={t('name')}
          registration={register('name')}
          error={errors.name?.message}
        />

        <TextInput
          id="email"
          label={t('email')}
          registration={register('email')}
          error={errors.email?.message}
        />

        <PasswordInput
          id="password"
          label={t('password')}
          registration={register('password')}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-end mt-2">
          <Link className="flex items-center justify-end" href={localPath(paths.FORGOT_PASSWORD)}>
            <TextDescription className="text-sm text-primary hover:text-primary/80 cursor-pointer">
              {t('forgotPassword')}
            </TextDescription>
          </Link>
        </div>

        <Button
          disabled={isSubmitting}
          onClick={() => localPath(paths.REGISTER)}
          className="w-full h-12  bg-primary text-white hover:bg-primary/80"
        >
          {isLoading[0] ? <IconLoading className="bg-white" /> : t('signUp')}
        </Button>
      </form>

      <div className="flex items-center justify-center mt-2">
        <TextDescription className=" text-gray-500 dark:text-gray-400">
          {t('youHaveAnAccount')}
        </TextDescription>
        <Link href={localPath(paths.LOGIN)}>
          <TextDescription className="text-primary hover:text-primary/80 cursor-pointer ml-1">
            {t('signIn')}
          </TextDescription>
        </Link>
      </div>

      <div className="relative my-3 w-full text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <TextDescription className="relative bg-background-1 dark:bg-background-2 px-4">
          Or
        </TextDescription>
      </div>
      <LoginWithGitHub />
    </div>
  );
}
