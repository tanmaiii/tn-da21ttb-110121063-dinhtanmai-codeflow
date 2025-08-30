'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IStatusObj } from '@/constants/object';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldError, FieldValues, Path, PathValue } from 'react-hook-form';

interface MySelectProps<T extends FieldValues = FieldValues> {
  label?: string;
  options: IStatusObj[];
  name: Path<T>;
  control?: Control<T>;
  error?: FieldError;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  isTranslate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function MySelect<T extends FieldValues>({
  options,
  name,
  control,
  error,
  defaultValue = '',
  disabled = false,
  required = false,
  className = '',
  label,
  onChange,
  isTranslate = true,
  size = 'lg',
}: MySelectProps<T>) {
  // const currentLocale = getCurrentLocale();
  const t = useTranslations();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  if (control && !onChange) {
    return (
      <div className="">
        {label && <Label className="mb-2 text-color-2 w-fit">{label}</Label>}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue as PathValue<T, Path<T>>}
          rules={{ required }}
          render={({ field }) => (
            <Select
              value={field.value}
              required={required}
              onValueChange={field.onChange}
              disabled={disabled || field.disabled}
            >
              <SelectTrigger
                className={`w-full bg-background-1 ${className} ${
                  size === 'sm'
                    ? '!h-9 !rounded-sm'
                    : size === 'md'
                    ? '!h-11 !rounded-md'
                    : '!h-13 !rounded-lg'
                }`}
              >
                <SelectValue placeholder={`${t('common.select')} ${label ? label : ''}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {isTranslate ? t(option.labelKey) : option.labelKey}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }

  // Support for uncontrolled usage without react-hook-form
  return (
    <div className="">
      {label && <Label className="mb-2 text-color-2 w-fit">{label}</Label>}
      <Select
        disabled={disabled}
        value={value}
        required={required}
        onValueChange={newValue => {
          setValue(newValue);
          onChange?.(newValue);
        }}
      >
        <SelectTrigger
          className={`w-full ${className} ${
            size === 'sm'
              ? '!h-9 !rounded-sm'
              : size === 'md'
              ? '!h-11 !rounded-md'
              : '!h-13 !rounded-lg'
          }`}
        >
          <SelectValue placeholder={`${t('common.select')} ${label ? label : ''}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {isTranslate ? t(option.labelKey) : option.labelKey}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
