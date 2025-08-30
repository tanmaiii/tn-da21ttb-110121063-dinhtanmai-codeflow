'use client';
import { Button } from '@/components/ui/button';
import { auth, provider } from '@/config/Firebase';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import authService from '@/services/auth.service';
import tokenService from '@/services/token.service';
import { useUserStore } from '@/stores/user_store';
import CryptoJS from 'crypto-js';
import { GithubAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export default function LoginWithGitHub({ ...props }: React.ComponentProps<'button'>) {
  const t = useTranslations('auth');
  const { setUser } = useUserStore();
  const router = useRouter();
  const { localPath } = useH_LocalPath();

  const handleSubmitGitHub = async () => {
    if (!auth) {
      console.error('Firebase not initialized. Please check Firebase configuration.');
      return;
    }
    signInWithPopup(auth, provider)
      .then(async (result: UserCredential) => {
        const credential = await GithubAuthProvider.credentialFromResult(result);
        // FIXME: Lấy token để test
        console.log(credential);
        const encryptedToken = await CryptoJS.AES.encrypt(
          credential?.accessToken ?? '',
          SECRET_KEY ?? '',
        ).toString();

        const res = await authService.loginWithGithub({
          accessToken: encryptedToken || '',
          uid: result.user.uid,
          email: result.user.email || '',
        });

        // 👉 Check nếu user chưa chấp nhận lời mời vào tổ chức
        if (res.data.status !== "active") {
          router.push(localPath(paths.JOIN_ORG(res.accessToken.token))); 
          return;
        }

        tokenService.accessToken = res.accessToken.token;
        setUser(res.data);
        router.push(paths.HOME);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Button
      onClick={() => handleSubmitGitHub()}
      className="w-full h-12 bg-primary/10 text-primary dark:text-white hover:bg-primary/20"
      {...props}
    >
      <Image
        src={IMAGES.GITHUB}
        alt="google"
        width={30}
        height={30}
        className="object-cover w-6 h-6 mr-2"
      />
      {t('signInWithGitHub')}
    </Button>
  );
}
