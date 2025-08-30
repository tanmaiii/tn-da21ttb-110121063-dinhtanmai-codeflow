import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { cx } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { UseFormRegisterReturn } from 'react-hook-form';
interface FormFieldProps extends React.ComponentProps<'input'> {
  label?: string;
  description?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export default function TextInput({
  label,
  id,
  type = 'text',
  registration,
  error,
  description,
  className,
  ...props
}: FormFieldProps) {
  const t = useTranslations('common');
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <Label htmlFor={id} className="text-color-2 mb-2">
          {label}
        </Label>
      )}
      <Input
        autoComplete="off"
        id={id}
        type={type}
        className={cx('bg-background-1 rounded-lg', error && 'border-1 border-red-500')}
        placeholder={t('enter') + ' ' + (label ?? '')}
        {...registration}
        {...props}
      />
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
