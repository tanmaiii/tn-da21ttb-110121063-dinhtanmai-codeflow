import { ICourse } from '@/interfaces/course';
import courseService from '@/services/course.service';
import { useUserStore } from '@/stores/user_store';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EllipsisIcon, PenIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import MoreDropdown, { DropdownAction } from '../MoreDropdown';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
interface CardCourse_MoreProps {
  course: ICourse;
  className?: string;
}

export default function CardCourse_More({ course, className }: CardCourse_MoreProps) {
  const user = useUserStore();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const queryClient = useQueryClient();
  const t = useTranslations('course');

  const onView = () => {
    router.push(localPath(paths.COURSES + '/' + course.id));
  };

  const onUpdate = () => {
    router.push(localPath(paths.COURSE_UPDATE(course.id)));
  };

  const mutationDelete = useMutation({
    mutationFn: () => {
      return courseService.delete(course.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success(t('courseDeleted'));
    },
    onError: () => {
      toast.error(t('courseDeleteError'));
    },
  });

  const isAuthor = user?.user?.id === course?.author?.id;

  const actions: DropdownAction[] = [
    {
      id: 'view',
      label: t('viewCourse'),
      icon: <IconEye size={16} />,
      onClick: onView,
      isVisible: true,
    },
    {
      id: 'update',
      label: t('updateCourse'),
      icon: <PenIcon size={16} />,
      onClick: onUpdate,
      isVisible: isAuthor,
    },
    {
      id: 'delete',
      label: t('deleteCourse'),
      icon: <IconTrash size={16} />,
      onClick: () => {},
      isVisible: isAuthor,
      isDeleteAction: true,
    },
  ];

  const handleDelete = () => {
    return Promise.resolve(mutationDelete.mutate());
  };

  return (
    <MoreDropdown
      actions={actions}
      className={className}
      deleteItemName={course.title}
      onDelete={handleDelete}
      trigger={
        <Button variant="rounded" size="icon" className="bg-white/30">
          <EllipsisIcon size={26} className="text-color-1" />
        </Button>
      }
    />
  );
}
