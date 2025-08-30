import { z } from "zod";
import { useTranslations } from "next-intl";

export function useForgotPasswordSchema() {
  const t = useTranslations("validate");
  return forgotPasswordSchema(t);
}

const forgotPasswordSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z.string().email(t("emailInvalid")).max(255),
  });

export type forgotPasswordSchemaType = z.infer<ReturnType<typeof forgotPasswordSchema>>;