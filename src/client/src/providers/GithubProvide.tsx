'use client';
import { ROLE } from '@/constants/enum';
import githubService from '@/services/github.service';
import tokenService from '@/services/token.service';
import { useUserStore } from '@/stores/user_store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GithubProvide({ children }: { children: React.ReactNode }) {
  const { user, removeUser } = useUserStore();
  const route = useRouter();

  useEffect(() => {
    if (tokenService.accessToken && user && user.role === ROLE.USER) {
      (async () => {
        try {
          const response = await githubService.checkUserInOrganization(user.username);
          if (response.data === false) {
            removeUser();
            tokenService.clearTokens();
            route.push('/login');
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          tokenService.clearTokens();
          route.push('/login');
        }
      })();
    }
  }, [user, route, removeUser]);

  return <>{children}</>;
}
