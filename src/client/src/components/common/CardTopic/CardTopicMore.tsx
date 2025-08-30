import { Button } from '@/components/ui/button';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { ITopic } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { useUserStore } from '@/stores/user_store';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EllipsisIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import MoreDropdown, { DropdownAction } from '../MoreDropdown';

interface CardPost_MoreProps {
  topic: ITopic;
  className?: string;
}

export default function CardTopicMore({ topic, className }: CardPost_MoreProps) {
  const user = useUserStore();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const queryClient = useQueryClient();
  const t = useTranslations('post');


  const onView = () => {
    router.push(localPath(paths.TOPICS_DETAIL(topic.id)));
  };

  const mutationDelete = useMutation({
    mutationFn: () => {
      return topicService.delete(topic.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success(t('postDeleted'));
    },
    onError: () => {
      toast.error(t('postDeleteError'));
    },
  });

  const isAuthor = user?.user?.id === topic?.author?.id;
  const isAdmin = user?.user?.role === 'admin';

  const actions: DropdownAction[] = [
    {
      id: 'view',
      label: 'View Post',
      icon: <IconEye size={16} />,
      onClick: onView,
      isVisible: true,
    },
    {
      id: 'update',
      label: 'Update Topic',
      icon: <IconPencil size={16} />,
      onClick: () => router.push(localPath(`/admin/${paths.TOPIC_UPDATE(topic.id)}`)),
      isVisible: isAdmin,
    },
    {
      id: 'delete',
      label: 'Delete Post',
      icon: <IconTrash size={16} />,
      onClick: () => {},
      isVisible: isAdmin || isAuthor,
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
      deleteItemName={topic.title}
      onDelete={handleDelete}
      trigger={customTrigger}
    />
  );
}
