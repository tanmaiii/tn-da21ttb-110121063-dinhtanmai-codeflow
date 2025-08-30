'use client';

import DragDropImage from '@/components/common/Input/DragDropImage/DragDropImage';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import RichTextEditor from '@/components/common/RichTextEditor/RichTextEditor';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { paths } from '@/data/path';
import useQ_Tag_GetAll from '@/hooks/query-hooks/Tag/useQ_Tag_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { postSchemaType, usePostSchema } from '@/lib/validations/postSchema';
import uploadService from '@/services/file.service';
import postService from '@/services/post.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function PostsCreate() {
  const [file, setFile] = useState<File | null>(null);
  const schema = usePostSchema();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const t = useTranslations('post');

  const Q_Tag = useQ_Tag_GetAll();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<postSchemaType>({
    resolver: zodResolver(schema),
  });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const image = await uploadService.upload(formData);
    return image.data.files[0].path;
  };

  const mutation = useMutation({
    mutationFn: async (body: postSchemaType) => {
      const thumbnail = file ? await handleUpload(file) : null;
      await postService.create({
        ...body,
        thumbnail: thumbnail || undefined,
        tags: body.tags || [],
      });
    },
    onError: (err: unknown) => {
      console.error(err);
      toast.error((err as Error)?.message || 'An error occurred while creating the post');
    },
    onSuccess: () => {
      reset();
      router.push(localPath(paths.POSTS));
      toast.success('Post created successfully');
    },
  });

  return (
    <div className="flex flex-col gap-4 py-10 justify-center items-center mx-auto bg-background-2">
      <Card className="w-full max-w-4xl py-4 px-4 lg:px-6 lg:py-8">
        <TitleHeader title={t('createPost')} onBack />
        <div className="flex flex-col gap-4">
          <Label className="text-color-2">{t('thumbnail')}</Label>
          <div className="h-[300px] w-full">
            <DragDropImage
              file={file}
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full h-full"
              accept="image/*"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(value => mutation.mutate(value))}
          className="flex flex-col gap-3"
        >
          <TextInput
            label={t('title')}
            className="w-full"
            registration={register('title')}
            error={errors.title?.message}
          />

          {Q_Tag.data?.data && (
            <MyMultiSelect
              label={t('tags')}
              name="tags"
              control={control}
              error={errors.tags?.message}
              options={
                Q_Tag.data?.data?.map(tag => ({
                  label: tag.name,
                  value: tag.id,
                })) || []
              }
            />
          )}

          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <RichTextEditor
                content={field.value}
                onChange={field.onChange}
                error={errors.content}
                className="min-h-[400px]"
              />
            )}
          />

          <div className="flex items-center justify-end gap-2 mt-4">
            <Button
              variant={'outline'}
              type="button"
              onClick={() => router.push(localPath(paths.POSTS))}
            >
              {t('cancel')}
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {t('save')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
