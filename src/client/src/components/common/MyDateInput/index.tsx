import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Control, Controller, FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';

interface MyDateInputProps<T extends FieldValues = FieldValues> {
  label: string;
  name: Path<T>;
  control?: Control<T>;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export default function MyDateInput<T extends FieldValues>({
  label,
  name,
  control,
  error,
  registration,
}: MyDateInputProps<T>) {
  const t = useTranslations('common');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="w-full">
          <Label className="mb-2 text-color-2">{label}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  'px-3 py-4 placeholder:text-muted-foreground gap-2 items-center selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-xl border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm',
                  !field.value && 'text-muted-foreground',
                )}
              >
                <CalendarIcon size={18} />
                {field.value ? (
                  utils_DateToDDMMYYYY(field.value)
                ) : (
                  <span>{t('pick', { field: label })}</span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                {...registration}
                initialFocus
                onDayClick={day => {
                  field.onChange(day);
                }}
              />
            </PopoverContent>
          </Popover>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}
    />
  );
}
