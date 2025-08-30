import { z } from 'zod';
import { useTranslations } from 'next-intl';

// Common validation rules for user fields
const commonUserFields = (
  t: ReturnType<typeof useTranslations>,
  tUser: ReturnType<typeof useTranslations>,
) => ({
  name: z
    .string({ message: t('required', { field: tUser('name') }) })
    .min(3, { message: t('minLength', { field: tUser('name'), length: 1 }) })
    .max(255, { message: t('maxLength', { field: tUser('name'), length: 255 }) }),
  username: z
    .string({ message: t('required', { field: tUser('username') }) })
    .min(3, { message: t('minLength', { field: tUser('username'), length: 1 }) })
    .max(255, { message: t('maxLength', { field: tUser('username'), length: 255 }) }),
  email: z
    .string({ message: t('required', { field: tUser('email') }) })
    .email({ message: t('emailInvalid') }),
  role: z.string({ message: t('required', { field: tUser('role') }) }),
});

// Password validation rules
const passwordValidation = (t: ReturnType<typeof useTranslations>) =>
  z
    .string()
    .min(6, t('short', { field: t('password') }))
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, t('passwordStrength'))
    .max(255);

export function useUserSchema() {
  const t = useTranslations('validate');
  const tUser = useTranslations('users');
  return {
    userSchema: userUpdateSchema({ t, tUser }),
    userCreateSchema: userCreateSchema({ t, tUser }),
    profileSchema: profileSchema({ t, tUser }),
  };
}

export const userUpdateSchema = ({
  t,
  tUser,
}: {
  t: ReturnType<typeof useTranslations>;
  tUser: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    ...commonUserFields(t, tUser),
    password: z.string().optional(),
  });

const userCreateSchema = ({
  t,
  tUser,
}: {
  t: ReturnType<typeof useTranslations>;
  tUser: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    ...commonUserFields(t, tUser),
    password: passwordValidation(t),
  });

const profileSchema = ({
  t,
  tUser,
}: {
  t: ReturnType<typeof useTranslations>;
  tUser: ReturnType<typeof useTranslations>;
}) =>
  z.object({
    name: z.string({ message: t('required', { field: tUser('name') }) })
      .min(3, t('minLength', { field: tUser('name'), length: 3 }))
      .max(50, t('maxLength', { field: tUser('name'), length: 50 })),
    email: z.string({ message: t('required', { field: tUser('email') }) })
      .email(t('emailInvalid')),
    bio: z.string({ message: t('required', { field: tUser('bio') }) })
      .max(255, t('maxLength', { field: tUser('bio'), length: 255 })).optional(),
  });

export type ProfileSchemaType = z.infer<ReturnType<typeof profileSchema>>;
export type UserUpdateSchemaType = z.infer<ReturnType<typeof userUpdateSchema>>;
export type UserCreateSchemaType = z.infer<ReturnType<typeof userCreateSchema>>;
