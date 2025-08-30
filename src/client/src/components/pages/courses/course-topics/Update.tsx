'use client';
import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import MySelect from '@/components/common/MySelect';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { STATUS_TOPIC } from '@/constants/object';
import { ITopic } from '@/interfaces/topic';
import { TopicSchemaType, useTopicSchema } from '@/lib/validations/topicSchema';
import topicService from '@/services/topic.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CourseTopicsUpdate({ topic }: { topic: ITopic }) {
  const t = useTranslations('common');
  const tTopic = useTranslations('topic');
  const schema = useTopicSchema();
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

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
    mutationFn: (data: TopicSchemaType) => {
      return topicService.update(topic.id, {
        ...data,
        courseId: topic.courseId,
      });
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      reset();
      closeRef.current?.click();
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: () => {
      toast.error(t('updateError'));
    },
  });

  useEffect(() => {
    reset({
      ...topic,
      members: topic.members?.map(member => member.userId),
      groupName: topic.groupName ?? '',
    });
  }, [topic, reset]);

  return (
    <ActionModal title={tTopic('updateTopic')} actionType={'update'}>
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="flex flex-col gap-3">
        <TextInput label={tTopic('title')} error={errors.title?.message} {...register('title')} />
        <TextareaInput
          label={tTopic('description')}
          className="min-h-[200px]"
          error={errors.description?.message}
          {...register('description')}
        />
        <MySelect
          label={tTopic('status')}
          name="status"
          options={STATUS_TOPIC}
          error={errors.status}
          required={true}
          control={control}
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild ref={closeRef}>
            <Button type="button" variant="outline">
              {t('cancel')}
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {t('create')}
          </Button>
        </div>
      </form>
    </ActionModal>
  );
}
