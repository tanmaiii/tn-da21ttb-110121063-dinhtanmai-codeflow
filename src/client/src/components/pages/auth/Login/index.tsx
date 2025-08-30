'use client';
import IconLoading from '@/components/common/IconLoading/IconLoading';
import PasswordInput from '@/components/common/Input/PasswordInput/PasswordInput';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { ROLE } from '@/constants/enum';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { } from '@/hooks/ussH_Toast';
import { loginSchemaType, useLoginSchema } from '@/lib/validations/loginSchema';
import authService from '@/services/auth.service';
import tokenService from '@/services/token.service';
import { useUserStore } from '@/stores/user_store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoginWithGitHub from '../login-with-github';

export default function Login() {
  const t = useTranslations('auth');
  const { localPath } = useH_LocalPath();
  const schema = useLoginSchema();
  const { setUser } = useUserStore();
  const router = useRouter();
  const error = useState<string>('');
  const isLoading = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (body: loginSchemaType) => {
      isLoading[1](true);
      const res = await authService.login(body);
      return res;
    },
    onError: (err: unknown) => {
      error[1]((err as Error)?.message || t('error'));
      isLoading[1](false);
    },
    onSuccess: data => {
      tokenService.accessToken = data.accessToken.token;
      setUser(data.data);
      if (data.data.role === ROLE.ADMIN) {
        router.push(localPath(paths.ADMIN));
      } else {
        router.push(localPath(paths.HOME));
      }
      isLoading[1](false);
    },
  });

  return (
    <div className="flex flex-col w-full h-fit gap-0">
      {t('welcome')} {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '👋' : '❌'}
      <TextDescription className="text-left text-base font-normal mb-4">
        {t('pleaseLogin')}
      </TextDescription>
      {error[0] && (
        <div className="flex flex-row items-center gap-2 text-white text-sm bg-red-400 py-2 px-3 border rounded-md mb-4">
          <CircleAlert style={{ width: '26px', height: '26px' }} />
          <span>{error[0]}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit(value => mutation.mutate(value))}
        className="flex flex-col gap-3"
      >
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
          className="w-full h-12 bg-primary text-white hover:bg-primary/80"
        >
          {isLoading[0] ? <IconLoading className="bg-white" /> : t('signIn')}
        </Button>
      </form>

      {/* <div className="flex items-center justify-center mt-2">
        <TextDescription className=" text-gray-500 dark:text-gray-400">
          {t('dontHaveAnAccount')}
        </TextDescription>
        <Link href={localPath(paths.REGISTER)}>
          <TextDescription className="text-primary hover:text-primary/80 cursor-pointer ml-1">
            {t('signUp')}
          </TextDescription>
        </Link>
      </div> */}

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
