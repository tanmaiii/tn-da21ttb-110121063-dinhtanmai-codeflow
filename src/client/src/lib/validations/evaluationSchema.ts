import { z } from 'zod';
import { useTranslations } from 'next-intl';

export function useEvaluationSchema() {
  const t = useTranslations('validate');
  const tTopic = useTranslations('topic');
  return evaluationSchema({ t, tTopic });
}

const evaluationSchema = ({
  t,
  tTopic,
}: {
  t: ReturnType<typeof useTranslations>;
  tTopic: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    evaluation: z
      .string()
      .min(1, { message: t('minLength', { field: tTopic('evaluations'), length: 1 }) })
      .max(300, {
        message: t('maxLength', { field: tTopic('evaluations'), length: 300 }),
      }),
  });

export type evaluationSchemaType = z.infer<ReturnType<typeof evaluationSchema>>;
