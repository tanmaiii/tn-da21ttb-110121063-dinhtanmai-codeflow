import ActionModal from '@/components/common/Action/ActionModal';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { ITagCreateDto } from '@/interfaces/tags';
import { TagSchemaType, useTagSchema } from '@/lib/validations/tagSchema';
import tagService from '@/services/tag.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function TagsCreate() {
  const tCommon = useTranslations('common');
  const t = useTranslations('tag');
  const schema = useTagSchema();
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TagSchemaType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const mutation = useMutation({
    mutationFn: (data: ITagCreateDto) => {
      return tagService.create(data);
    },
    onSuccess: () => {
      toast.success(tCommon('updateSuccess'));
      closeRef.current?.click();
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      reset();
    },
    onError: () => {
      toast.error(tCommon('updateError'));
    },
  });

  return (
    <ActionModal
      title={tCommon('create')}
      icon={
        <>
          <IconPlus className="w-4 h-4" />
          {tCommon('create')}
        </>
      }
      actionType={'default'}
    >
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="flex flex-col gap-3">
        <TextInput label={t('name')} error={errors.name?.message} {...register('name')} />
        <TextareaInput
          label={t('description')}
          error={errors.description?.message}
          {...register('description')}
          className="h-30"
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild ref={closeRef}>
            <Button type="button" variant="outline">
              {tCommon('cancel')}
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {tCommon('update')}
          </Button>
        </div>
      </form>
    </ActionModal>
  );
}
