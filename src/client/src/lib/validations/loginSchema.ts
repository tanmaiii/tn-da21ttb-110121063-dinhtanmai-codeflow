import { z } from "zod";
import { useTranslations } from "next-intl";

export function useLoginSchema() {
  const t = useTranslations("validate");
  return loginSchema(t);
}

const loginSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z.string().email(t("emailInvalid")).max(255),
    password: z
      .string()
      .min(6, t("short", { field: t("password") }))
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
        t("passwordStrength") // thông báo lỗi khi không thỏa regex
      )
      .max(255),
  });

export type loginSchemaType = z.infer<ReturnType<typeof loginSchema>>;
