import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { LoadingOverlay } from '@/components/common/Loading';
import MySelect from '@/components/common/MySelect';
import { Button } from '@/components/ui/button';
import { LANGUAGE_TYPE } from '@/constants/object';
import { IRepos } from '@/interfaces/repos';
import { RepoSchemaType, useRepoSchema } from '@/lib/validations/useRepoSchema';
import reposService from '@/services/repos.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ReposUpdate({ repos }: { repos: IRepos }) {
  const tCommon = useTranslations('common');
  const tRepos = useTranslations('repos');
  const schema = useRepoSchema();
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control,
  } = useForm<RepoSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: repos.name,
      language: repos.language,
      framework: repos.framework,
    },
  });

  // Watch language field to filter framework options
  const selectedLanguage = watch('language');

  // Calculate framework options based on selected language
  const frameworkOptions = useMemo(() => {
    if (!selectedLanguage || !repos.language) return [];
    const frameworks = LANGUAGE_TYPE[selectedLanguage as keyof typeof LANGUAGE_TYPE];
    return (
      frameworks?.map(item => ({
        value: item,
        labelKey: item,
      })) || []
    );
  }, [selectedLanguage]);

  // Reset framework when language changes
  useEffect(() => {
    if (selectedLanguage) {
      setValue('framework', '');
    }
  }, [selectedLanguage, setValue]);

  useEffect(() => {
    reset({
      name: repos.name,
      language: repos.language,
      framework: repos.framework,
    });
  }, [repos, reset]);

  const mutation = useMutation({
    mutationFn: async (data: RepoSchemaType) => {
      await reposService.update(repos.id, {
        name: data.name,
        topicId: repos.topicId,
        language: data.language,
        framework: data.framework,
      });
    },
    onSuccess: () => {
      toast.success(tCommon('updateSuccess'));
      queryClient.invalidateQueries({ queryKey: ['repos'] });
      reset();
      closeRef.current?.click();
    },
    onError: () => {
      toast.error(tCommon('updateError'));
    },
  });

  if (mutation.isPending) {
    return <LoadingOverlay message="updating..." />;
  }

  return (
    <ActionModal title={tRepos('updateRepo')} actionType={'update'} className="max-w-[50vw]">
      <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <div className="flex flex-col gap-2">
          <TextInput
            label={tRepos('nameRepo')}
            {...register('name')}
            description={tRepos('createRepoDescription')}
            error={errors.name?.message}
          />
          <MySelect
            label={tRepos('language')}
            name="language"
            options={Object.keys(LANGUAGE_TYPE).map(item => ({
              value: item,
              labelKey: item,
            }))}
            isTranslate={false}
            control={control}
            error={errors.language}
            required={true}
          />
          <MySelect
            label={tRepos('framework')}
            name="framework"
            options={frameworkOptions}
            isTranslate={false}
            control={control}
            error={errors.framework}
            required={true}
          />
          <div className="flex justify-end gap-2">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="outline">
                {tCommon('cancel')}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {tCommon('update')}
            </Button>
          </div>
        </div>
      </form>
    </ActionModal>
  );
}
