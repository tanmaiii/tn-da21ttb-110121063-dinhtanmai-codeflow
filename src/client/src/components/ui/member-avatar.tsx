import { TextDescription } from '@/components/ui/text';
import { ROLE_TOPIC } from '@/constants/object';
import { paths } from '@/data/path';
import apiConfig from '@/lib/api';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import MyImage from '../common/MyImage';
import { useOnlineUsersStore } from '@/stores/online_users_store';
import useQ_User_GetDetail from '@/hooks/query-hooks/User/useQ_User_GetDetail';

interface MemberAvatarProps {
  avatar?: string;
  name?: string;
  role?: string;
  description?: string;
  size?: number;
  className?: string;
  id?: string;
}

export default function MemberAvatar({
  avatar,
  name,
  role,
  description,
  size = 34,
  className,
  id,
}: MemberAvatarProps) {
  const router = useRouter();
  const t = useTranslations();
  const { isUserOnline } = useOnlineUsersStore();
  const { data: user } = useQ_User_GetDetail({
    id: id ?? '',
    options: {
      enabled: !!id,
    },
  });

  const isOnline = id ? isUserOnline(id) : false;

  return (
    <div
      onClick={() => {
        if (id) {
          router.push(paths.USER_DETAIL(id));
        }
      }}
      className={cn('flex flex-row cursor-pointer items-center gap-2', className)}
    >
      <div className="relative">
        <MyImage
          src={avatar || apiConfig.avatar(name)}
          alt={name || ''}
          width={size}
          height={size}
          minWidth={size}
          minHeight={size}
          className={`rounded-full`}
          defaultSrc={apiConfig.avatar(name)}
        />
        {isOnline && user?.data?.settings?.onlineStatus && (
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
        )}
      </div>

      <div className="flex flex-col">
        <TextDescription className="text-color-1 truncate">{name}</TextDescription>
        {description && (
          <TextDescription className="text-xs text-color-2">{description}</TextDescription>
        )}
        {role && (
          <TextDescription className="text-xs text-color-2">
            {(() => {
              const roleObj = ROLE_TOPIC.find(item => item.value === role);
              return roleObj?.labelKey ? t(roleObj.labelKey) : role;
            })()}
          </TextDescription>
        )}
      </div>
    </div>
  );
}
