'use client';
import { Checkbox } from '@/components/ui/checkbox';

interface MyCheckboxProps {
  label: string;
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function MyCheckbox({ label: labelText, checked, id, onChange }: MyCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {labelText}
      </label>
    </div>
  );
}
