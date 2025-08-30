'use client';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import authService from '@/services/auth.service';
import tokenService from '@/services/token.service';
import { useUserStore } from '@/stores/user_store';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const ORG_NAME = process.env.NEXT_PUBLIC_ORG_NAME || 'organization-codeflow';

export default function JoinOrganization() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useUserStore();
  const { localPath } = useH_LocalPath();
  const t = useTranslations('auth');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const url = `https://github.com/orgs/${ORG_NAME}/invitation`;
  const MAX_ATTEMPTS = 12; // 12 lần, tức 1 phút nếu 5s/lần

  useEffect(() => {
    if (!token) return;

    const checkStatus = async () => {
      if (document.visibilityState !== 'visible') return;

      try {
        setChecking(true);
        const res = await authService.checkJoinOrganization({ token });

        if (res.data.status === 'active') {
          clearInterval(intervalRef.current!);
          tokenService.accessToken = token;
          setUser(res.data);
          router.push(paths.HOME);
        } else {
          setAttempts(prev => prev + 1);
        }
      } catch (error) {
        console.error(error);
        clearInterval(intervalRef.current!);
        router.push(paths.LOGIN);
      } finally {
        setChecking(false);
      }
    };

    intervalRef.current = setInterval(() => {
      if (attempts >= MAX_ATTEMPTS) {
        clearInterval(intervalRef.current!);
        setErrorMessage('Quá thời gian chờ. Vui lòng thử lại sau.');
        return;
      }
      checkStatus();
    }, 5000);

    return () => clearInterval(intervalRef.current!);
  }, [token, attempts, router, setUser]);

  return (
    <div className="flex flex-col gap-4">
      <TextDescription>{t('acceptInvitationDescription')}</TextDescription>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button
          variant="outline"
          className="w-full h-12 bg-primary/10 text-primary dark:text-white hover:bg-primary/20"
        >
          <Image
            src={IMAGES.GITHUB}
            alt="google"
            width={30}
            height={30}
            className="object-cover w-6 h-6 mr-2"
          />
          {checking ? 'Checking...' : t('acceptInvitation')}
        </Button>
      </a>
      {errorMessage && (
        <TextDescription className="text-destructive text-sm text-center">
          {errorMessage}
        </TextDescription>
      )}
      <div className="flex flex-col items-center justify-center">
        <div className="relative my-3 w-full text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <TextDescription className="relative bg-background-1 dark:bg-background-2 px-4">
            Or
          </TextDescription>
        </div>
        <Link href={localPath(paths.LOGIN)}>
          <TextDescription className="text-primary hover:text-primary/80 cursor-pointer ml-1">
            {t('signIn')}
          </TextDescription>
        </Link>
      </div>
    </div>
  );
}
