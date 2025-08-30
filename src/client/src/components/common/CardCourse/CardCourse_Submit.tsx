import ActionModal from '@/components/common/Action/ActionModal';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import courseService from '@/services/course.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import PasswordInput from '../Input/PasswordInput/PasswordInput';
import { useUserStore } from '@/stores/user_store';
import { ROLE } from '@/constants/enum';
import { TextDescription } from '@/components/ui/text';
interface CardCourse_SubmitProps {
  courseId: string;
}

const joinCourseSchema = () =>
  z.object({
    password: z.string().optional(),
  });

export type JoinCourseSchemaType = z.infer<ReturnType<typeof joinCourseSchema>>;

export default function CardCourse_Submit({ courseId }: CardCourse_SubmitProps) {
  const ButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { user } = useUserStore();
  const t = useTranslations('course');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const [err, setErr] = useState<string>('');
  const { localPath } = useH_LocalPath();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinCourseSchemaType>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(joinCourseSchema()),
  });

  const mutation = useMutation({
    mutationFn: (data: JoinCourseSchemaType) => {
      return courseService.joinCourse(courseId, data.password ?? '');
    },
    onSuccess: () => {
      toast.success(tCommon('joinSuccess'));
      router.push(`${localPath(paths.COURSES_DETAIL(courseId))}`);
    },
    onError: (err: unknown) => {
      setErr((err as Error)?.message || t('error'));
    },
  });

  const isStudent = user?.role === ROLE?.USER;

  return (
    <ActionModal
      title={t('join')}
      icon={
        <Button ref={ButtonRef} className="w-full dark:text-white">
          {t('join')}
        </Button>
      }
      actionType="non-icon"
    >
      {err && (
        <div className="flex flex-row items-center gap-2 text-white text-sm bg-red-400 py-2 px-3 border rounded-md mb-4">
          <CircleAlert style={{ width: '26px', height: '26px' }} />
          <span>{err}</span>
        </div>
      )}
      {isStudent ? (
        <form
          onSubmit={handleSubmit(data => mutation.mutate(data))}
          className="flex flex-col gap-3"
        >
          <PasswordInput
            registration={register('password')}
            label={'Password'}
            description={t('joinDescription')}
            error={errors.password?.message}
          />
          <div className="flex justify-end gap-2">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="outline">
                {t('cancel')}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {t('join')}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-3">
          <TextDescription>{t('onlyStudent')}</TextDescription>
          <div className="flex justify-end gap-2">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="outline">
                {t('cancel')}
              </Button>
            </DialogClose>
          </div>
        </div>
      )}
    </ActionModal>
  );
}
