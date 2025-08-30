'use client';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { paths } from '@/data/path';
import useQ_Course_GetMembers from '@/hooks/query-hooks/Course/useQ_Course_GetMembers';
import useQ_Topic_GetDetail from '@/hooks/query-hooks/Topic/useQ_Topic_GetDetail';
import { TopicSchemaType, useTopicSchema } from '@/lib/validations/topicSchema';
import topicService from '@/services/topic.service';
import { useUserStore } from '@/stores/user_store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function TopicsUpdate() {
  const tTopic = useTranslations('topic');
  const t = useTranslations('common');
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: Q_Topic, isLoading, isError } = useQ_Topic_GetDetail({ id: id as string });
  const schema = useTopicSchema();
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<TopicSchemaType>({
    resolver: zodResolver(schema),
  });

  const { data: Q_Members } = useQ_Course_GetMembers({
    id: Q_Topic?.data?.courseId ?? '',
    params: {
      page: 1,
      limit: 1000,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TopicSchemaType) => {
      return topicService.update(id as string, {
        courseId: Q_Topic?.data?.courseId ?? '',
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topic', id] });
      router.push(`/topics/${id}`);
    },
  });

  useEffect(() => {
    reset({
      title: Q_Topic?.data?.title,
      description: Q_Topic?.data?.description,
      groupName: Q_Topic?.data?.groupName,
      status: Q_Topic?.data?.status,
    });
  }, [Q_Topic, reset]);

  useEffect(() => {
    if (Q_Topic?.data?.members?.find(member => member.role === 'leader')?.userId !== user?.id) {
      router.push(paths.TOPICS_DETAIL(id as string));
    }
  }, [Q_Topic, user?.id, router, id]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex flex-col gap-4 py-10 justify-center items-center mx-auto bg-background-2">
      <Card className="w-full max-w-4xl py-4 px-4 lg:px-6 lg:py-8">
        <TitleHeader title={tTopic('updateTopic')} onBack />
        <form
          onSubmit={handleSubmit(data => mutation.mutate(data))}
          className="flex flex-col gap-3"
        >
          <TextInput
            label={tTopic('title')}
            disabled
            error={errors.title?.message}
            {...register('title')}
          />
          <TextareaInput
            label={tTopic('description')}
            className="min-h-[200px]"
            error={errors.description?.message}
            {...register('description')}
          />
          <TextInput
            label={tTopic('groupName')}
            error={errors.groupName?.message}
            {...register('groupName')}
          />
          {Q_Topic?.data?.members &&
            Q_Topic?.data?.course?.maxGroupMembers &&
            Q_Topic?.data?.course?.maxGroupMembers > 1 && (
              <MyMultiSelect
                label={tTopic('members')}
                name="members"
                control={control}
                maxLength={(Q_Topic.data.course?.maxGroupMembers ?? 3) - 1}
                defaultValue={
                  Q_Topic?.data?.members
                    ?.filter(member => member.userId !== user?.id)
                    .map(member => member.userId) ?? []
                }
                options={
                  Q_Members?.data
                    ?.filter(member => member.id !== user?.id)
                    .map(member => ({
                      value: member.id,
                      label: member.name,
                    })) ?? []
                }
              />
            )}
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {t('update')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
