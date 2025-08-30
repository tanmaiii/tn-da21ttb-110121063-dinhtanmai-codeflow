import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { IPost } from '@/interfaces/post';
import postService from '@/services/post.service';
import { useUserStore } from '@/stores/user_store';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EllipsisIcon, PenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MoreDropdown, { DropdownAction } from '../MoreDropdown';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
interface CardPost_MoreProps {
  post: IPost;
  className?: string;
}

export default function CardPostMore({ post, className }: CardPost_MoreProps) {
  const user = useUserStore();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const queryClient = useQueryClient();
  const t = useTranslations('post');

  const onView = () => {
    router.push(localPath(paths.POSTS + '/' + post.id));
  };

  const onUpdate = () => {
    router.push(localPath(paths.POST_UPDATE(post.id)));
  };

  const mutationDelete = useMutation({
    mutationFn: () => {
      return postService.delete(post.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success(t('postDeleted'));
    },
    onError: () => {
      toast.error(t('postDeleteError'));
    },
  });

  const isAuthor = user?.user?.id === post?.author?.id;
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
      label: 'Update Post',
      icon: <PenIcon size={16} />,
      onClick: onUpdate,
      isVisible: isAuthor || isAdmin,
    },
    {
      id: 'delete',
      label: 'Delete Post',
      icon: <IconTrash size={16} />,
      onClick: () => {},
      isVisible: isAuthor || isAdmin,
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
      deleteItemName={post.title}
      onDelete={handleDelete}
      trigger={customTrigger}
    />
  );
}
