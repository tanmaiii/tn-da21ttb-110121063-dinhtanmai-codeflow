'use client';
import { Button } from '@/components/ui/button';
import { INotification } from '@/interfaces/notification';
import notificationService from '@/services/notification.service';
import { IconEye, IconEyeOff, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EllipsisIcon } from 'lucide-react';
import MoreDropdown, { DropdownAction } from '../MoreDropdown';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
interface NotificationItem_MoreProps {
  item: INotification;
  className?: string;
}

export default function NotificationItem_More({ item, className }: NotificationItem_MoreProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('notification');
  const tCommon = useTranslations('common');
  
  const mutationRead = useMutation({
    mutationFn: (isRead: boolean) => {
      return notificationService.read(item.id, isRead);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['notifications', 'user'],
        exact: false 
      });
      toast.success(tCommon('updateSuccess'));
    },
  });

  const mutationDelete = useMutation({
    mutationFn: () => {
      return notificationService.delete(item.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['notifications', 'user'],
        exact: false 
      });
      toast.success(tCommon('deleteSuccess'));
    },
  });

  const actions: DropdownAction[] = [
    {
      id: 'read',
      label: t('readNotification'),
      icon: <IconEye size={16} />,
      onClick: () => mutationRead.mutate(true),
      isVisible: !item.isRead,
    },
    {
      id: 'unread',
      label: t('unreadNotification'),
      icon: <IconEyeOff size={16} />,
      onClick: () => mutationRead.mutate(false),
      isVisible: item.isRead,
    },
    {
      id: 'delete',
      label: t('deleteNotification'),
      icon: <IconTrash size={16} />,
      onClick: () => {},
      isDeleteAction: true,
    },
  ];

  const handleDelete = () => {
    return Promise.resolve(mutationDelete.mutate());
  };

  const customTrigger = (
    <Button variant="rounded" className="p-x-0" size="icon">
      <EllipsisIcon size={26} />
    </Button>
  );

  return (
    <MoreDropdown
      actions={actions}
      className={className}
      deleteItemName={item.title}
      onDelete={handleDelete}
      trigger={customTrigger}
    />
  );
}
