import { z } from "zod";
import { useTranslations } from "next-intl";

export function useRegisterSchema() {
  const t = useTranslations("validate");
  return registerSchema(t);
}

const registerSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z
      .string()
      .min(2, t("short", { field: t("name") }))
      .max(255),
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

export type RegisterSchemaType = z.infer<ReturnType<typeof registerSchema>>;
