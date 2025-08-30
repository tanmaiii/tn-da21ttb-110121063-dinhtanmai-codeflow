import ActionModal from '@/components/common/Action/ActionModal';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import { Button } from '@/components/ui/button';
import { ITopic } from '@/interfaces/topic';
import { evaluationSchemaType, useEvaluationSchema } from '@/lib/validations/evaluationSchema';
import topicEvaluationService from '@/services/topic_evaluation.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { IconMessageCircle, IconPlus, IconStar } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function TopicsEvaluationCreate({ topic }: { topic: ITopic }) {
  const tCommon = useTranslations('common');
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const schema = useEvaluationSchema();
  const t = useTranslations('topic');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<evaluationSchemaType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: evaluationSchemaType) => {
      try {
        return topicEvaluationService.create({
          evaluation: data.evaluation,
          topicId: topic.id,
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success(tCommon('createSuccess'));
      reset();
      closeRef.current?.click();
      queryClient.invalidateQueries({ queryKey: ['evaluations', 'topic', topic?.id], });
    },
    onError: error => {
      console.error('Error creating evaluation:', error);
      toast.error(tCommon('createError'));
    },
  });

  return (
    <ActionModal
      title="Thêm nhận xét"
      icon={
        <>
          <IconPlus className="w-4 h-4" />
          <span className="font-medium">{t('evaluation')}</span>
        </>
      }
      actionType={'default'}
      className="max-w-[600px]"
    >
      <div className="space-y-6 p-2">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-full border border-blue-200/50 dark:border-blue-700/50">
          <IconMessageCircle className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Dự án: {topic.title}
          </span>
        </div>

        <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-6">
          {/* Content Input */}
          <TextareaInput
            label="Nội dung đánh giá"
            placeholder="Nhập nhận xét và đánh giá chi tiết về dự án..."
            className="min-h-[200px]"
            {...register('evaluation')}
            error={errors.evaluation?.message}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <DialogClose asChild ref={closeRef}>
              <Button
                type="button"
                variant="outline"
                className="px-6 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {tCommon('cancel')}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang lưu...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <IconStar className="w-4 h-4" />
                  {tCommon('create')}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </ActionModal>
  );
}
