import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cx } from "class-variance-authority";
import { useTranslations } from "next-intl";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  id: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export default function NumberInput({
  label,
  id,
  registration,
  error,
  ...props
}: FormFieldProps) {
  const t = useTranslations("common");

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id} className="mb-2 text-color-2">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          autoComplete="off"
          id={id}
          type="number"
          className={cx("bg-background-1", error && "border-1 border-red-500")}
          placeholder={t("enter") + " " + label}
          {...registration}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
