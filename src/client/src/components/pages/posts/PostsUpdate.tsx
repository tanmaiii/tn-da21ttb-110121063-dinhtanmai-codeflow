'use client';

import DragDropImage from '@/components/common/Input/DragDropImage/DragDropImage';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import RichTextEditor from '@/components/common/RichTextEditor/RichTextEditor';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useQ_Post_GetDetail from '@/hooks/query-hooks/Post/useQ_Post_GetDetail';
import useQ_Tag_GetAll from '@/hooks/query-hooks/Tag/useQ_Tag_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { postSchemaType, usePostSchema } from '@/lib/validations/postSchema';
import uploadService from '@/services/file.service';
import postService from '@/services/post.service';
import { useUserStore } from '@/stores/user_store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function PostsUpdate() {
  const [file, setFile] = useState<File | null>(null);
  const [updateThumbnail, setUpdateThumbnail] = useState(false);
  const user = useUserStore();
  const schema = usePostSchema();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const params = useParams();
  const id = params?.id;
  const t = useTranslations('post');
  const queryClient = useQueryClient();
  const Q_Tag = useQ_Tag_GetAll();
  const Q_Post = useQ_Post_GetDetail({
    id: id?.toString() || '',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<postSchemaType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (Q_Post.data?.data) {
      reset({
        title: Q_Post.data.data.title,
        content: Q_Post.data.data.content,
        tags: Q_Post.data.data.tags.map(tag => tag.id),
      });
    }
  }, [Q_Post.data, reset]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const image = await uploadService.upload(formData);
    return image.data.files[0].path;
  };

  const mutation = useMutation({
    mutationFn: async (body: postSchemaType) => {
      const thumbnail = file ? await handleUpload(file) : null;
      if (!id) return;
      await postService.update(id.toString(), {
        ...body,
        ...(updateThumbnail && { thumbnail: thumbnail ?? '' }),
        tags: body.tags ?? [],
      });
    },
    onError: (err: unknown) => {
      console.error(err);
      toast.error((err as Error)?.message || 'An error occurred while creating the post');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'detail', id] });
      reset();
      router.push(localPath(paths.POSTS));
      toast.success('Post created successfully');
    },
  });

  useEffect(() => {
    if (
      user &&
      Q_Post.data &&
      user?.user?.id !== Q_Post.data?.data?.author?.id &&
      user?.user?.role !== 'admin'
    ) {
      toast.error('You are not authorized to update this post');
      router.push(localPath(paths.POSTS));
    }
  }, [user, Q_Post, localPath, router]);

  if (Q_Post.isLoading) return <TextDescription>Loading...</TextDescription>;
  if (Q_Post.error) return <TextDescription>Error...</TextDescription>;

  return (
    <div className="flex flex-col gap-4 py-10 justify-center items-center mx-auto bg-background-2">
      <Card className="bg-background-1 w-full max-w-4xl py-4 px-4 lg:px-6 lg:py-8">
        <TitleHeader title={t('updatePost')} onBack />
        <div className="flex flex-col gap-4">
          <Label className="text-color-2">{t('thumbnail')}</Label>
          <div className="h-[300px] w-full">
            <DragDropImage
              image_default={Q_Post.data?.data?.thumbnail ?? ''}
              file={file}
              onChange={e => {
                setFile(e.target.files?.[0] || null);
                setUpdateThumbnail(true);
              }}
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
            placeholder={t('title')}
            className="w-full"
            registration={register('title')}
            error={errors.title?.message}
            {...register('title')}
          />

          {Q_Tag.data?.data && (
            <MyMultiSelect
              label={t('tags')}
              name="tags"
              control={control}
              error={errors.tags?.message}
              defaultValue={Q_Post.data?.data?.tags.map(tag => tag.id)}
              options={
                Q_Tag.data?.data?.map(tag => ({
                  label: tag.name,
                  value: tag.id,
                })) || []
              }
            />
          )}

          <div className="flex flex-col gap-2">
            <Label className="text-color-2">{t('content')}</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  content={Q_Post.data?.data?.content || ''}
                  onChange={field.onChange}
                  error={errors.content}
                  className="min-h-[400px]"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button
              variant={'outline'}
              type="button"
              onClick={() => router.push(localPath(paths.POSTS))}
            >
              {t('cancel')}
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {t('update')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
