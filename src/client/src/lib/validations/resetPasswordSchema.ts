import { z } from "zod";
import { useTranslations } from "next-intl";

export function useResetPasswordSchema() {
  const t = useTranslations("validate");
  return resetPasswordSchema(t);
}

const resetPasswordSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    newPassword: z
      .string()
      .min(6, t("short", { field: t("password") }))
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
        t("passwordStrength")
      )
      .max(255),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: t("passwordNotMatch"),
    path: ["confirmPassword"],
  });

export type resetPasswordSchemaType = z.infer<ReturnType<typeof resetPasswordSchema>>;