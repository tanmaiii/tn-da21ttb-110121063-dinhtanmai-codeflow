import { useOnlineUsersStore } from '@/stores/online_users_store';
import { useTranslations } from 'next-intl';
import { Users, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import userService from '@/services/user.service';
import MemberAvatar from '@/components/ui/member-avatar';
import { IUser } from '@/interfaces/user';

interface OnlineUsersListProps {
  className?: string;
  showAvatars?: boolean;
}

export default function OnlineUsersList({ className, showAvatars = false }: OnlineUsersListProps) {
  const t = useTranslations();
  const { getOnlineUsersList } = useOnlineUsersStore();
  const onlineUserIds = getOnlineUsersList();

  // Fetch online users details
  const { data: onlineUsersData, isLoading } = useQuery({
    queryKey: ['onlineUsers'],
    queryFn: () => userService.getOnlineUsers(),
    enabled: onlineUserIds.length > 0,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const onlineUsers: IUser[] = onlineUsersData?.data || [];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users size={20} />
          {t('Online Users')} ({onlineUserIds.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">{t('Loading...')}</p>
        ) : onlineUserIds.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('No users currently online')}</p>
        ) : showAvatars ? (
          <div className="space-y-3">
            {onlineUsers.map((user) => (
              <MemberAvatar
                key={user.id}
                id={user.id}
                name={user.name}
                avatar={user.avatar}
                role={user.role}
                size={32}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-2 text-sm">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                <span>{user.name}</span>
                <span className="text-muted-foreground">(@{user.username})</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 