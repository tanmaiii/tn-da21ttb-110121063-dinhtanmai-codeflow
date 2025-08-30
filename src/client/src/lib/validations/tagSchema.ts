import { z } from 'zod';
import { useTranslations } from 'next-intl';

export function useTagSchema() {
  const t = useTranslations('validate');
  const tTag = useTranslations('tag');
  return tagSchema({ t, tTag });
}

const tagSchema = ({
  t,
  tTag,
}: {
  t: ReturnType<typeof useTranslations>;
  tTag: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    name: z
      .string({ message: t('required', { field: tTag('name') }) })
      .min(1, { message: t('minLength', { field: tTag('name'), length: 1 }) })
      .max(50, {
        message: t('maxLength', { field: tTag('name'), length: 50 }),
      }),
    description: z
      .string({ message: t('required', { field: tTag('description') }) })
      .min(1, {
        message: t('minLength', { field: tTag('description'), length: 1 }),
      })
      .max(800, {
        message: t('maxLength', { field: tTag('description'), length: 800 }),
      }),
  });

export type TagSchemaType = z.infer<ReturnType<typeof tagSchema>>;
