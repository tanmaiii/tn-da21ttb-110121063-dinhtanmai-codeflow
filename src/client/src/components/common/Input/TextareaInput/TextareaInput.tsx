import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cx } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps extends React.ComponentProps<'input'> {
  label: string;
  id?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
}

export default function TextareaInput({
  label,
  id,
  registration,
  error,
  ...props
}: FormFieldProps) {
  const t = useTranslations('common');
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="mb-2 text-color-2">
        {label}
      </Label>
      <Textarea
        id={id}
        className={cx(
          '!bg-background-2',
          error && 'border-1 border-red-500',
        )}
        placeholder={t('enter') + ' ' + label}
        {...registration}
        {...(Object.fromEntries(
          Object.entries(props).filter(([key]) => !['onError'].includes(key)),
        ) as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
