'use client';

import DragDropFile from '@/components/common/Input/DragDropFile/DragDropFile';
import DragDropImage from '@/components/common/Input/DragDropImage/DragDropImage';
import NumberInput from '@/components/common/Input/NumberInput/NumberInput';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import MyDateInput from '@/components/common/MyDateInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import MySelect from '@/components/common/MySelect';
import RichTextEditor from '@/components/common/RichTextEditor/RichTextEditor';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { TYPE_COURSE } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Tag_GetAll from '@/hooks/query-hooks/Tag/useQ_Tag_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { ICreateCourseDto } from '@/interfaces/course';
import { courseSchemaType, useCourseSchema } from '@/lib/validations/courseSchema';
import courseService from '@/services/course.service';
import fileService from '@/services/file.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CoursesCreate() {
  const t = useTranslations('course');
  const tCommon = useTranslations('common');
  const [image, setImage] = useState<File | null>(null);
  const [files, setFiles] = useState<File[] | []>([]);
  const schema = useCourseSchema();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const Q_Tag = useQ_Tag_GetAll();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<courseSchemaType>({
    resolver: zodResolver(schema),
  });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const image = await fileService.upload(formData);
    return image.data.files[0].path;
  };

  const handleUploadFile = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    const file = await fileService.upload(formData);
    return file.data.files.map(file => file.path);
  };

  const mutation = useMutation({
    mutationFn: async (data: courseSchemaType) => {
      const imagePath = image ? await handleUpload(image as File) : null;
      const filesPath = files.length > 0 ? await handleUploadFile(files) : [];
      const courseData: ICreateCourseDto = {
        ...data,
        thumbnail: imagePath || undefined,
        documents: filesPath || [],
      };
      const res = await courseService.create(courseData);
      return res.data;
    },
    onSuccess: () => {
      reset();
      router.push(localPath(paths.COURSES));
      toast.success(tCommon('createSuccess'));
    },
    onError: () => {
      toast.error(tCommon('createError'));
    },
  });

  return (
    <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="py-6">
      <TitleHeader title={t('createCourse')} onBack />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 lg:col-span-9 flex flex-col gap-6 order-2 mdmd:order-1">
          <Card className="p-4">
            <div className="flex flex-row gap-4 w-full">
              <MyDateInput
                label={t('regStartDate')}
                name="regStartDate"
                control={control}
                error={errors.regStartDate?.message}
              />

              <MyDateInput
                label={t('regEndDate')}
                name="regEndDate"
                control={control}
                error={errors.regEndDate?.message}
              />
            </div>
            <div className="flex flex-row gap-4 w-full">
              <MyDateInput
                label={t('startDate')}
                name="startDate"
                control={control}
                error={errors.startDate?.message}
              />

              <MyDateInput
                label={t('endDate')}
                name="endDate"
                control={control}
                error={errors.endDate?.message}
              />
            </div>
            <div className="flex flex-row gap-4 w-full">
              <MyDateInput
                label={t('topicDeadline')}
                name="topicDeadline"
                control={control}
                error={errors.topicDeadline?.message}
              />
              <NumberInput
                label={t('maxGroupMembers')}
                className="w-full"
                id="maxGroupMembers"
                registration={register('maxGroupMembers', {
                  setValueAs: value => Number(value),
                })}
                min={1}
                max={100}
                error={errors.maxGroupMembers?.message}
              />
            </div>
            {Q_Tag.data && (
              <MyMultiSelect
                label={t('tags')}
                name="tags"
                control={control}
                error={errors.tags?.message}
                options={Q_Tag.data.data.map(tag => ({ label: tag.name, value: tag.id }))}
              />
            )}
          </Card>

          <Card className="p-4">
            <MySelect
              label={t('typeCourse')}
              name="type"
              control={control}
              error={errors.type?.message ? errors.type : undefined}
              options={TYPE_COURSE}
            />
            <TextInput
              label={t('title')}
              className="w-full"
              registration={register('title')}
              error={errors.title?.message}
            />
            <TextInput
              label={t('password')}
              className="w-full"
              registration={register('password')}
              error={errors.password?.message}
            />
            <div className="flex flex-col gap-2">
              <Label className="text-color-2">{t('description')}</Label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    error={errors.description}
                    className="min-h-[400px]"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button
                variant={'outline'}
                type="button"
                onClick={() => router.push(localPath(paths.COURSES))}
              >
                {t('cancel')}
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {t('save')}
              </Button>
            </div>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-5 lg:col-span-3 flex flex-col gap-6 order-1 md:order-2 lg:sticky top-16 h-fit">
          <Card className="w-full p-4">
            <Label className="text-color-2">{t('thumbnail')}</Label>
            <DragDropImage
              file={image}
              onChange={e => setImage(e.target.files?.[0] || null)}
              className="h-[240px] w-full"
              accept="image/*"
            />
          </Card>

          <Card className="w-full p-4">
            <Label className="text-color-2">PDF file</Label>
            <DragDropFile
              files={files}
              onChange={e => setFiles(Array.from(e.target.files || []))}
              className="h-[220px] w-full"
              accept="application/pdf"
            />
          </Card>
        </div>
      </div>
    </form>
  );
}
