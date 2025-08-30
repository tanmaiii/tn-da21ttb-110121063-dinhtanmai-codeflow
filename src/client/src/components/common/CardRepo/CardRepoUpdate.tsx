import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LANGUAGE_TYPE } from '@/constants/object';
import { IRepos } from '@/interfaces/repos';
import { cn } from '@/lib/utils';
import { RepoSchemaType, useRepoSchema } from '@/lib/validations/useRepoSchema';
import reposService from '@/services/repos.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import TextInput from '../Input/TextInput/TextInput';
import MySelect from '../MySelect';

export default function CardRepoUpdate({ repos }: { repos: IRepos }) {
  const tCommon = useTranslations('common');
  const tRepo = useTranslations('repos');
  const queryClient = useQueryClient();
  const schema = useRepoSchema();
  const closeRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
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
        language: data.language,
        framework: data.framework,
        topicId: repos.topicId,
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

  return (
    <DialogContent className={cn('px-4')}>
      <DialogHeader>
        <DialogTitle>{tRepo('updateRepo')}</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <TextInput
          label={tRepo('nameRepo')}
          {...register('name')}
          description={tRepo('createRepoDescription')}
          error={errors.name?.message}
        />
        <MySelect
          label={tRepo('language')}
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
          label={tRepo('framework')}
          name="framework"
          options={frameworkOptions}
          isTranslate={false}
          control={control}
          error={errors.framework}
          required={true}
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild ref={closeRef}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(data => mutation.mutate(data))}
          >
            {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : tCommon('update')}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
