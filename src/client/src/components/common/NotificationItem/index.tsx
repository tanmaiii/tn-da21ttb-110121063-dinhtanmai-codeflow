import TextHeading from '@/components/ui/text';
import { NOTIFICATION_TYPE } from '@/constants/object';
import { ENUM_TYPE_NOTIFICATION, INotification } from '@/interfaces/notification';
import { cn } from '@/lib/utils';
import notificationService from '@/services/notification.service';
import { utils_TimeAgo } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import NotificationItem_More from './NotificationItem_More';
import { useTranslations } from 'next-intl';
interface NotificationItemProps {
  item?: INotification;
  className?: string;
}

export const IconNotification = ({ type }: { type: ENUM_TYPE_NOTIFICATION }) => {
  const getIcon = () => {
    switch (type) {
      case ENUM_TYPE_NOTIFICATION.TOPIC_EVALUATION:
        return '📝';
      case ENUM_TYPE_NOTIFICATION.COMMENT:
        return '💬';
      case ENUM_TYPE_NOTIFICATION.COMMENT_REPLY:
        return '↩️';
      case ENUM_TYPE_NOTIFICATION.LIKE_POST:
        return '❤️';
      case ENUM_TYPE_NOTIFICATION.JOIN_COURSE:
        return '👥';
      case ENUM_TYPE_NOTIFICATION.REGISTER_TOPIC:
        return '📋';
      case ENUM_TYPE_NOTIFICATION.APPROVE_TOPIC:
        return '✅';
      case ENUM_TYPE_NOTIFICATION.REJECT_TOPIC:
        return '❌';
      case ENUM_TYPE_NOTIFICATION.SYSTEM:
        return '⚙️';
      default:
        return '🔔';
    }
  };

  return (
    <div className="p-2 bg-color-2/10 rounded-full w-10 h-10 flex items-center justify-center">
      {getIcon()}
    </div>
  );
};

export default function NotificationItem({ item, className }: NotificationItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutationRead = useMutation({
    mutationFn: () => {
      return notificationService.read(item?.id || '', true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'user'],
        exact: false,
      });
    },
  });

  const handleNotificationClick = () => {
    if (item?.link) {
      router.push(item.link);
    }
    mutationRead.mutate();
  };

  return (
    <div
      className={cn(
        'border bg-gradient-to-r py-4 px-3 rounded-lg cursor-pointer transition-colors flex items-start gap-2 ',
        !item?.isRead
          ? 'border-l-4 border-green-500 from-green-50 to-blue-50 dark:from-green-500/10 dark:to-green-500/10'
          : '',
        className,
      )}
    >
      <div className="flex-1 flex flex-row gap-2" onClick={handleNotificationClick}>
        <IconNotification type={item?.type || ENUM_TYPE_NOTIFICATION.SYSTEM} />
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between gap-2">
            <TextHeading lineClamp={1}>
              {/* {util_get_locale_label(NOTIFICATION_TYPE, item?.type || '')} */}
              {t(NOTIFICATION_TYPE.find(type => type.value === item?.type)?.labelKey ?? '')}
            </TextHeading>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {utils_TimeAgo(item?.createdAt || '')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-3">{item?.message}</p>
        </div>
      </div>
      <div className="flex items-center my-auto gap-2 ml-auto">
        {item && <NotificationItem_More item={item} />}
      </div>
    </div>
  );
}
