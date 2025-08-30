import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { cx } from 'class-variance-authority';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps extends React.ComponentProps<'input'> {
  label?: string;
  description?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
}

export default function PasswordInput({
  label,
  description,
  id,
  registration,
  error,
  className,
  ...props
}: FormFieldProps) {
  const t = useTranslations('common');
  const [isOff, setIsOff] = useState<boolean>(false);

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <Label htmlFor={id} className="mb-2 text-color-2">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          autoComplete="off"
          id={id}
          type={isOff ? 'text' : 'password'}
          className={cx('bg-background-1', error && 'border-1 border-red-500')}
          placeholder={t('enter') + ' ' + label}
          {...registration}
          {...props}
        />
        <Button
          onClick={() => setIsOff(!isOff)}
          variant="none"
          type="button"
          className="border-0 absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-color-1 hover:bg-transparent focus:bg-transparent active:bg-transparent"
        >
          {!isOff ? (
            <EyeIcon style={{ width: '24px', height: '24px' }} />
          ) : (
            <EyeOff style={{ width: '24px', height: '24px' }} />
          )}
        </Button>
      </div>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
