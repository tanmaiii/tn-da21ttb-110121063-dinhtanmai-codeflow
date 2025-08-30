'use client';
import HeaderAuth from '@/components/layout/HeaderAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TextHeading from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import { useThemeStore } from '@/stores/theme_store';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import './style.css';

// export const metadata: Metadata = {
//   title: "Đăng nhập | CodeFlow",
// };

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useThemeStore();

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen relative bg-background-1">
      <HeaderAuth />
      <div className="absolute top-0 w-full h-full left-1/2 -translate-x-1/2">
        <Image
          src={theme === 'dark' ? IMAGES.BG_LOGIN : IMAGES.BG_LOGIN_LIGHT}
          alt="background"
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="z-20 w-full p-4 flex items-center justify-center">
        <Card
          className={cx(
            'w-full md:w-[460px] h-fit dark:bg-background-2 bg-background-1 gap-0 px-2 py-6 shadow-[-2px_-2px_52px_-16px_rgba(0,0,255,0.6)]',
            theme === 'dark' && 'shadow-[-8px_-27px_59px_-50px_rgba(0,0,255,0.41)]',
            theme === 'light' && 'shadow-[2px_2px_52px_-16px_rgba(0,0,255,0.6)]',
          )}
        >
          <CardHeader>
            <div className="flex items-center gap-2 justify-center ">
              <Image width={40} height={40} src={IMAGES.LOGO} alt="logo.png" />
              <TextHeading className="text-4xl font-bold text-primary">CodeFlow</TextHeading>
            </div>
            <CardTitle className="text-left text-xl font-bold mt-4">
              {/* {t("welcome")} */}
            </CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
