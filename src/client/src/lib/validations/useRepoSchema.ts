import { useTranslations } from 'next-intl';
import { z } from 'zod';

export function useRepoSchema() {
  const t = useTranslations('validate');
  const tRepo = useTranslations('repos');
  return repoSchema({ t, tRepo });
}

const repoSchema = ({
  t,
  tRepo,
}: {
  t: ReturnType<typeof useTranslations>;
  tRepo: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    name: z
      .string({ message: t('required', { field: tRepo('nameRepo') }) })
      .min(1, { message: t('minLength', { field: tRepo('nameRepo'), length: 1 }) })
      .max(255, {
        message: t('maxLength', { field: tRepo('nameRepo'), length: 255 }),
      }),
    language: z
      .string({ message: t('required', { field: tRepo('language') }) })
      .min(1, { message: t('selectMin', { field: tRepo('language'), length: 1 }) }),
    framework: z
      .string({ message: t('required', { field: tRepo('framework') }) })
      .min(1, { message: t('selectMin', { field: tRepo('framework'), length: 1 }) }),
  });

export type RepoSchemaType = z.infer<ReturnType<typeof useRepoSchema>>;
