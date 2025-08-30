import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import { IUser } from '@/interfaces/user';
import { IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface AuthorInfoProps {
  user: IUser;
}

export default function AuthorInfo({ user }: AuthorInfoProps) {
  const t = useTranslations('repos');
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <IconUser className="size-4" />
          {t('author')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <MemberAvatar
            name={user.name || ''}
            avatar={user.avatar}
            description={user?.username}
            size={56}
            id={user.id}
          />
        </div>
      </CardContent>
    </Card>
  );
}
