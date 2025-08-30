import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { utils_IsDateBefore } from '@/utils/date';

export function useCourseSchema() {
  const t = useTranslations('validate');
  const tCourse = useTranslations('course');
  return courseSchema({ t, tCourse });
}

const courseSchema = ({
  t,
  tCourse,
}: {
  t: ReturnType<typeof useTranslations>;
  tCourse: ReturnType<typeof useTranslations>;
}) =>
  z
    .object({
      title: z
        .string({ message: t('required', { field: tCourse('title') }) })
        .min(1, { message: t('minLength', { field: tCourse('title'), length: 1 }) })
        .max(255, {
          message: t('maxLength', { field: tCourse('title'), length: 255 }),
        }),
      description: z
        .string({ message: t('required', { field: tCourse('description') }) })
        .min(1, {
          message: t('minLength', { field: tCourse('description'), length: 1 }),
        })
        .max(10000, {
          message: t('maxLength', { field: tCourse('description'), length: 10000 }),
        }),
      thumbnail: z.string().optional().nullable(),
      tags: z.array(z.string({ message: t('required', { field: tCourse('tags') }) })),
      type: z
        .string({ message: t('required', { field: tCourse('typeCourse') }) })
        .min(1, { message: t('selectMin', { field: tCourse('typeCourse'), length: 1 }) }),
      regStartDate: z.date({ message: t('required', { field: tCourse('regStartDate') }) }),
      regEndDate: z.date({ message: t('required', { field: tCourse('regEndDate') }) }),
      startDate: z.date({ message: t('required', { field: tCourse('startDate') }) }),
      endDate: z.date({ message: t('required', { field: tCourse('endDate') }) }),
      topicDeadline: z.date({ message: t('required', { field: tCourse('topicDeadline') }) }),
      maxGroupMembers: z
        .number({ message: t('required', { field: tCourse('maxGroupMembers') }) })
        .min(1, { message: t('min', { field: tCourse('maxGroupMembers'), length: 1 }) })
        .max(100, { message: t('max', { field: tCourse('maxGroupMembers'), length: 100 }) }),
      documents: z.array(z.string()).optional(),
      password: z.string().max(255, { message: t('maxLength', { field: tCourse('password'), length: 255 }) }).optional(),
    })
    .refine(
      data => {
        return utils_IsDateBefore(data.regStartDate, data.regEndDate);
      },
      {
        message: t('dateAfter', {
          firstField: tCourse('regEndDate'),
          secondField: tCourse('regStartDate'),
        }),
        path: ['regEndDate'],
      },
    )
    .refine(
      data => {
        return utils_IsDateBefore(data.startDate, data.endDate);
      },
      {
        message: t('dateAfter', {
          firstField: tCourse('endDate'),
          secondField: tCourse('startDate'),
        }),
        path: ['endDate'],
      },
    )
    .refine(
      data => {
        return utils_IsDateBefore(data.regEndDate, data.startDate);
      },
      {
        message: t('dateAfter', {
          firstField: tCourse('startDate'),
          secondField: tCourse('regEndDate'),
        }),
        path: ['startDate'],
      },
    )
    .refine(
      data => {
        return utils_IsDateBefore(data.endDate, data.topicDeadline);
      },
      {
        message: t('dateAfter', {
          firstField: tCourse('topicDeadline'),
          secondField: tCourse('endDate'),
        }),
        path: ['topicDeadline'],
      },
    );

export type courseSchemaType = z.infer<ReturnType<typeof courseSchema>>;
