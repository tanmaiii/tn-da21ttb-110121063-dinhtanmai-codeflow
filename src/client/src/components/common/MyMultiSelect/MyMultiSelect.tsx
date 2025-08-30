import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { Control, Controller, FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';
import { MultiSelect as MultiSelectShadeUI } from '../../ui/multi-select';

interface Props<T extends FieldValues = FieldValues> {
  label: string;
  id?: string;
  name: Path<T>;
  control?: Control<T>;
  type?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  options: { label: string; value: string }[];
  defaultValue?: string[];
  maxLength?: number;
  onChange?: (value: string[]) => void;
}

export default function MyMultiSelect<T extends FieldValues>({
  label,
  id,
  control,
  name,
  registration,
  error,
  options,
  defaultValue = [],
  maxLength,
  onChange,
  ...props
}: Props<T>) {
  const t = useTranslations('common');

  const handleValueChange = (value: string[]) => {
    // console.log(value);
    if (onChange) {
      onChange(value);
    }
  };

  if (control && !onChange) {
    return (
      <div className="flex flex-col space-y-1">
        <Label htmlFor={id} className="mb-2 text-color-2">
          {label}
        </Label>
        <Controller
          name={name ?? ''}
          control={control}
          render={({ field }) => (
            <MultiSelectShadeUI
              className="rounded-lg"
              options={options}
              defaultValue={field.value || defaultValue}
              {...registration}
              {...props}
              placeholder={t('select') + ' ' + label}
              onValueChange={value => {
                field.onChange(value);
                handleValueChange(value);
              }}
              maxLength={maxLength}
            />
          )}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={id} className="mb-2 text-color-2">
        {label}
      </Label>
      <MultiSelectShadeUI
        className="rounded-lg"
        options={options}
        defaultValue={defaultValue}
        {...registration}
        {...props}
        placeholder={t('select') + ' ' + label}
        maxLength={maxLength}
        onValueChange={handleValueChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
