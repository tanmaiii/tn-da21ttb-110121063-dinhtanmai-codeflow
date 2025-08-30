'use client';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import MySelect from '@/components/common/MySelect';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { STATUS_TOPIC } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import useQ_Course_GetMembers from '@/hooks/query-hooks/Course/useQ_Course_GetMembers';
import { TopicSchemaType, useTopicSchema } from '@/lib/validations/topicSchema';
import topicService from '@/services/topic.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function TopicsCreate() {
  const tTopic = useTranslations('topic');
  const t = useTranslations('common');
  const schema = useTopicSchema();
  const [courseId, setCourseId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<TopicSchemaType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: TopicSchemaType) => {
      if (!courseId) return;

      return await topicService.create({
        ...data,
        courseId: courseId,
        isCustom: true,
      });
    },
    onSuccess: () => {
      router.push(`/admin/${paths.TOPICS}`);
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success(t('createSuccess'));
      reset();
    },
    onError: () => {
      toast.error(t('createError'));
    },
  });

  const Q_Course = useQ_Course_GetAll({
    params: {
      page: 1,
      limit: 1000,
    },
  });

  const { data: Q_CourseDetail } = useQ_Course_GetDetail({
    id: courseId ?? '',
  });

  const { data: Q_Members } = useQ_Course_GetMembers({
    id: courseId ?? '',
    params: {
      page: 1,
      limit: 1000,
    },
  });

  return (
    <div className="flex flex-col gap-4 py-10 justify-center items-center mx-auto bg-background-2">
      <Card className="w-full max-w-4xl py-4 px-4 lg:px-6 lg:py-8">
        <TitleHeader title={tTopic('createTopic')} onBack />
        <form
          onSubmit={handleSubmit(data => mutation.mutate(data))}
          className="flex flex-col gap-3"
        >
          <MySelect
            label={tTopic('course')}
            name="courseId"
            options={
              Q_Course.data?.data.map(course => ({
                value: course.id,
                label: course.title,
                labelKey: course.title,
              })) || []
            }
            defaultValue={Q_Course.data?.data[0].id}
            onChange={value => setCourseId(value)}
          />
          <TextInput label={tTopic('title')} error={errors.title?.message} {...register('title')} />
          <MySelect
            label={tTopic('status')}
            name="status"
            options={STATUS_TOPIC}
            error={errors.status}
            control={control}
            required={true}
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
          <div className="flex flex-col gap-2">
            <MyMultiSelect
              label={tTopic('members')}
              name="members"
              control={control}
              maxLength={Q_CourseDetail?.data?.maxGroupMembers ?? 3}
              options={
                Q_Members?.data?.map(member => ({
                  value: member.id,
                  label: member.name,
                })) ?? []
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {t('create')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
