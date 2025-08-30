'use client';
import { DashboardCardUserSkeleton } from '@/components/skeletons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TextHeading from '@/components/ui/text';
import { ROLE } from '@/constants/enum';
import { ROLE_USER } from '@/constants/object';
import { paths } from '@/data/path';
import apiConfig from '@/lib/api';
import tokenService from '@/services/token.service';
import { useUserStore } from '@/stores/user_store';
import {
  IconActivity,
  IconBell,
  IconBook,
  IconCalendar,
  IconChalkboard,
  IconLogout,
  IconMail,
  IconSettings,
  IconShield,
  IconStar,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function DashboardCardUser() {
  const { user, removeUser } = useUserStore();
  const router = useRouter();
  const tDashboard = useTranslations('dashboard');
  const t = useTranslations();

  const handleLogout = () => {
    tokenService.clearTokens();
    removeUser();
    router.push('/login');
  };

  if (!user) {
    return <DashboardCardUserSkeleton />;
  }

  const userRole = ROLE_USER.find(role => role.value === user.role);

  // Get role-specific styling
  const getRoleConfig = () => {
    switch (user.role) {
      case ROLE.ADMIN:
        return {
          badgeVariant: 'destructive' as const,
          gradientFrom: 'from-red-500',
          gradientTo: 'to-pink-500',
          icon: IconShield,
          accentColor: 'text-red-600',
        };
      case ROLE.TEACHER:
        return {
          badgeVariant: 'default' as const,
          gradientFrom: 'from-blue-500',
          gradientTo: 'to-indigo-500',
          icon: IconStar,
          accentColor: 'text-blue-600',
        };
      default:
        return {
          badgeVariant: 'secondary' as const,
          gradientFrom: 'from-green-500',
          gradientTo: 'to-emerald-500',
          icon: IconUser,
          accentColor: 'text-green-600',
        };
    }
  };

  const roleConfig = getRoleConfig();
  const RoleIcon = roleConfig.icon;

  return (
    <Card className="shadow-xl p-0 border-0 backdrop-blur-sm overflow-hidden min-h-[90vh]">
      {/* Header with gradient */}
      <div
        className={`h-24 bg-gradient-to-r ${roleConfig.gradientFrom} ${roleConfig.gradientTo} relative`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
            <AvatarImage src={user.avatar || apiConfig.avatar(user.name)} alt={user.name} />
            <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="pt-12 pb-6 px-6">
        {/* User Profile Section */}
        <div className="text-center space-y-3 mb-6">
          <TextHeading className="text-center flex justify-center w-full">{user.name}</TextHeading>
          <Badge variant={getRoleConfig().badgeVariant} className="text-sm font-medium  px-3 py-1">
            <RoleIcon className="h-3 w-3 mr-1" />
            {userRole?.labelKey ? t(userRole.labelKey) : user.role}
          </Badge>

          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <IconActivity className="h-4 w-4" />
            <span>{tDashboard('activeStatus')}</span>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* User Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className={`p-2 rounded-full bg-white shadow-sm ${roleConfig.accentColor}`}>
              <IconUser className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Username</p>
              <p className="font-medium text-sm truncate">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className={`p-2 rounded-full bg-white shadow-sm ${roleConfig.accentColor}`}>
              <IconMail className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium text-sm truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Quick Actions */}
        <div className="space-y-2">
          <TextHeading className="text-sm flex items-center">
            <IconActivity className="w-4 h-4 mr-2 text-blue-600" />
            {tDashboard('quickActions')}
          </TextHeading>

          {/* Common Actions */}
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-blue-50 hover:text-blue-700 transition-colors"
            onClick={() => router.push(paths.COURSES)}
          >
            <IconBook className="w-4 h-4 mr-3" />
            {tDashboard('courses')}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-blue-50 hover:text-blue-700 transition-colors"
            onClick={() => router.push(paths.NOTIFICATION)}
          >
            <IconBell className="w-4 h-4 mr-3" />
            {tDashboard('notifications')}
          </Button>

          {/* Teacher/Admin specific actions */}
          {(user.role === ROLE.TEACHER || user.role === ROLE.ADMIN) && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                onClick={() => router.push(paths.TOPICS)}
              >
                <IconChalkboard className="w-4 h-4 mr-3" />
                {tDashboard('manageTopics')}
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                onClick={() => router.push(paths.COURSE_CREATE)}
              >
                <IconCalendar className="w-4 h-4 mr-3" />
                {tDashboard('createCourse')}
              </Button>
            </>
          )}

          {/* Admin specific actions */}
          {user.role === ROLE.ADMIN && (
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-red-50 hover:text-red-700 transition-colors"
              onClick={() => router.push(paths.USERS)}
            >
              <IconSettings className="w-4 h-4 mr-3" />
              {tDashboard('manageUsers')}
            </Button>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-4">
          <Separator className="mb-4" />
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
            onClick={handleLogout}
          >
            <IconLogout className="w-4 h-4 mr-2" />
            {tDashboard('logout')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
