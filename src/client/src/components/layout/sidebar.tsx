'use client';

import { ROLE_USER } from '@/constants/object';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import { ILinkItem } from '@/interfaces/common';
import apiConfig from '@/lib/api';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar_store';
import { useThemeStore } from '@/stores/theme_store';
import { useUserStore } from '@/stores/user_store';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Book,
  FolderGit,
  Github,
  Home,
  Layout,
  LogIn,
  LogOut,
  LucideIcon,
  MessageCircle,
  Newspaper,
  Settings,
  Tags,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MyImage from '../common/MyImage';

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  users: Users,
  settings: Settings,
  home: Home,
  book: Book,
  project: FolderGit,
  article: Newspaper,
  repos: Github,
  tag: Tags,
  comment: MessageCircle,
};

const RenderNavItem = ({ item, prefix }: { item: ILinkItem; prefix: string }) => {
  const Icon = iconMap[item.icon] || Home;
  const { collapsed } = useSidebarStore();
  const t = useTranslations();

  const pathname = usePathname();
  const pathWithoutLocale = pathname?.replace(/^\/(en|vi)/, '');

  let isActive = false;
  if (item.href === '/') {
    isActive = pathWithoutLocale === '/' || pathname === '/en' || pathname === '/vi';
  } else {
    isActive =
      pathWithoutLocale === `${prefix}${item.href}` ||
      pathWithoutLocale?.startsWith(`${prefix}${item.href}/`) ||
      false;
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        key={item.href}
        href={`${prefix}${item.href}`}
        className={cn(
          'flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-primary/10',
          isActive && 'bg-primary/10',
        )}
      >
        <Icon className="w-5 h-5" />
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-medium"
            >
              {/* {currentLocale === 'vi' ? item.vi : item.en} */}
              {t(item.labelKey)}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
};

type SidebarProps = {
  prefix?: string; // admin thì '/admin', user thì ''
  menu: ILinkItem[];
};

export default function Sidebar({ menu, prefix = '' }: SidebarProps) {
  const { collapsed } = useSidebarStore();
  const { theme } = useThemeStore();
  const t = useTranslations('auth');
  const { user } = useUserStore();
  const router = useRouter();

  return (
    <motion.aside
      layout
      initial={false}
      animate={{
        width: collapsed ? '4rem' : '16rem',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className={clsx(
        `h-[calc(100vh-56px)] border-r bg-background-1 dark:bg-background-3 flex flex-col
        fixed left-0 top-14 bottom-0 md:sticky z-20 xl:sticky`,
        collapsed ? 'hidden md:flex' : 'w-full md:w-64',
      )}
    >
      <Link href={paths.HOME} className="flex items-center gap-2">
        <motion.div layout className="p-4 gap-2 flex items-center w-full justify-start">
          <Image
            width={40}
            height={40}
            src={theme === 'dark' ? IMAGES.LOGO : IMAGES.LOGO_LIGHT}
            alt="logo.png"
          />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.h4
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold text-primary"
              >
                CodeFlow
              </motion.h4>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>

      <nav className="flex-1 space-y-1 px-2">
        {menu.map(item => (
          <RenderNavItem item={item} prefix={prefix} key={item.href} />
        ))}
      </nav>

      <motion.div layout className="p-2 border-t flex flex-col gap-2">
        {user ? (
          <>
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(paths.USER_DETAIL(user.id))}
              className="flex items-center cursor-pointer gap-2 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-background-2"
            >
              <MyImage
                src={user?.avatar ?? apiConfig.avatar(user?.name)}
                alt="avatar.png"
                width={100}
                height={100}
                className={cn(
                  'object-cover circle rounded-full w-8 h-8 max-w-8 max-h-8',
                  collapsed && 'w-full h-full',
                )}
                defaultSrc={apiConfig.avatar(user?.name ?? 'c')}
              />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-center gap-0"
                  >
                    <span className="text-md/3">{user?.name}</span>
                    <span className="text-sm/4 text-gray-500">
                      {(() => {
                        const roleObj = ROLE_USER.find(item => item.value === user?.role);
                        return roleObj?.labelKey ? t(roleObj.labelKey) : user?.role;
                      })()}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={paths.LOGOUT}
                className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-background-2"
              >
                <LogOut className="w-5 h-5" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t('logout')}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={paths.LOGIN}
              className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-background-2"
            >
              <LogIn className="w-5 h-5" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t('signIn')}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.aside>
  );
}
