"use client";

import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { utils_DateToDDMMYYYY } from "@/utils/date";
import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  id?: string;
  type?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

export function DateInput({
  label,
  id,
  registration,
  error,
  defaultValue,
  onChange,
}: FormFieldProps) {
  const [date, setDate] = React.useState<Date>();
  const t = useTranslations("common");

  React.useEffect(() => {
    if (defaultValue) {
      setDate(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="w-full">
      <Label htmlFor={id} className="mb-2 text-color-2">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "px-3 py-4 placeholder:text-muted-foreground gap-2 items-center selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 rounded-xl border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon size={18} />
            {date ? (
              utils_DateToDDMMYYYY(date)
            ) : (
              <span>{t("pick", { field: label })}</span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            {...registration}
            onDayClick={(day) => {
              setDate(day);
              onChange?.(day);
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
