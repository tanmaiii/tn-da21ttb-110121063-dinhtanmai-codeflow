import TextInput from '@/components/common/Input/TextInput/TextInput';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useQ_User_GetMe from '@/hooks/query-hooks/User/useQ_User_GetMe';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchemaType, useUserSchema } from '@/lib/validations/userSchema';
import userService from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ProfileTab() {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');
  const { data: user, isLoading } = useQ_User_GetMe({});
  const queryClient = useQueryClient();
  const schema = useUserSchema();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(schema.profileSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
    },
  });

  // Watch all form values to check for changes
  const formValues = watch();

  // Reset form when user data loads
  useEffect(() => {
    if (user?.data) {
      reset({
        name: user.data.name || '',
        email: user.data.email || '',
        bio: user.data.bio || '',
      });
    }
  }, [user?.data, reset]);

  // Mutation for updating user profile
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileSchemaType) => {
      if (!user?.data?.id) throw new Error('User ID not found');
      return await userService.update(user.data.id, { ...user.data, ...data });
    },
    onSuccess: () => {
      toast.success(tCommon('updateSuccess'));
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      // Reset the form's dirty state
      reset(formValues);
    },
    onError: error => {
      console.error('Update profile error:', error);
      toast.error(tCommon('updateError'));
    },
  });

  const onSubmit = (data: ProfileSchemaType) => {
    updateProfileMutation.mutate(data);
  };

  const handleReset = () => {
    if (user?.data) {
      reset({
        name: user.data.name || '',
        email: user.data.email || '',
        bio: user.data.bio || '',
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('personalInfo')}</CardTitle>
        <CardDescription>{t('personalInfoDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <TextInput
                id="name"
                label={t('fullName')}
                max={20}
                {...register('name')}
                error={errors.name?.message}
              />
            </div>
            <div className="space-y-2">
              <TextInput
                id="email"
                disabled
                label={t('email')}
                max={255}
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
          </div>

          <div className="space-y-2">
            <TextareaInput
              id="bio"
              label={t('bio')}
              className="h-24"
              max={255}
              {...register('bio')}
              error={errors.bio?.message}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={!isDirty || isSubmitting || updateProfileMutation.isPending}
            >
              {isSubmitting || updateProfileMutation.isPending ? 'Loading...' : t('saveChanges')}
            </Button>
            {isDirty && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isSubmitting || updateProfileMutation.isPending}
              >
                {t('cancel')}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
