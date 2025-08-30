'use client';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import { Button } from '@/components/ui/button';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { TopicSchemaType, useTopicSchema } from '@/lib/validations/topicSchema';
import courseService from '@/services/course.service';
import topicService from '@/services/topic.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUserStore } from '@/stores/user_store';

// Đăng ký chủ đề của sinh viên
export default function StudentTopicCreation() {
  const tTopic = useTranslations('topic');
  const tCommon = useTranslations('common');
  const schema = useTopicSchema();
  const params = useParams();
  const [members, setMembers] = useState<string[]>([]);
  const [nameGroup, setNameGroup] = useState<string>('');
  const router = useRouter();
  const { user } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TopicSchemaType>({
    resolver: zodResolver(schema),
  });

  const { data: Q_Members } = useQuery({
    queryKey: ['topics', params?.id],
    queryFn: () => courseService.memberInCourse(params?.id as string, { page: 1, limit: -1 }),
  });

  const { data: Q_Course } = useQ_Course_GetDetail({ id: params?.id as string });

  const mutation = useMutation({
    mutationFn: async (value: TopicSchemaType) => {
      const topic = await topicService.create({
        title: value.title,
        description: value.description,
        isCustom: true,
        courseId: params?.id as string,
        groupName: nameGroup,
        members: members,
      });
      return topic;
    },
    onSuccess: () => {
      toast.success(tCommon('createSuccess'));
      setNameGroup('');
      setMembers([]);
      reset();
      router.back();
    },
    onError: () => {
      toast.error(tCommon('createError'));
    },
  });

  return (
    <form
      onSubmit={handleSubmit(value => {
        mutation.mutate(value);
      })}
      className="flex flex-col gap-3"
    >
      <TextInput label={tTopic('title')} error={errors.title?.message} {...register('title')} />
      <TextareaInput
        label={tTopic('description')}
        className="min-h-[200px]"
        error={errors.description?.message}
        {...register('description')}
      />
      <TextInput
        label={tTopic('groupName')}
        name="groupName"
        onChange={e => setNameGroup(e.target.value)}
      />
      {Q_Course?.data?.maxGroupMembers && Q_Course?.data?.maxGroupMembers > 1 && <div className="flex flex-col gap-2">
        <MyMultiSelect
          label={tTopic('members')}
          name="members"
          maxLength={(Q_Course?.data.maxGroupMembers ?? 3 ) - 1}
          onChange={value => setMembers(value)}
          options={
            Q_Members?.data?.map(member => ({
              value: member.id,
              label: member.name,
            })).filter(member => member?.value !== user?.id) ?? []
          }
        />
      </div>}
      <div className="flex justify-end mt-auto">
        <Button type="submit" className="w-fit" disabled={isSubmitting}>
          {tCommon('create')}
        </Button>
      </div>
    </form>
  );
}
