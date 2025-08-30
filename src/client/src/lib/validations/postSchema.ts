import { z } from "zod";
import { useTranslations } from "next-intl";

export function usePostSchema() {
  const t = useTranslations("validate");
  const tPost = useTranslations("post");
  return postSchema({ t, tPost });
}

const postSchema = ({
  t,
  tPost,
}: {
  t: ReturnType<typeof useTranslations>;
  tPost: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    title: z
      .string({ message: t("required", { field: tPost("title") }) })
      .min(1, { message: t("minLength", { field: tPost("title"), length: 1 }) })
      .max(255, {
        message: t("maxLength", { field: tPost("title"), length: 255 }),
      }),
    content: z
      .string({ message: t("required", { field: tPost("content") }) })
      .min(1, {
        message: t("minLength", { field: tPost("content"), length: 1 }),
      })
      .max(10000, {
        message: t("maxLength", { field: tPost("content"), length: 10000 }),
      }),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).optional(),
  });

export type postSchemaType = z.infer<ReturnType<typeof postSchema>>;
