import { TextDescription } from "@/components/ui/text";
import { cx } from "class-variance-authority";
import React from "react";

interface CardPostButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  value?: string;
  icon: React.ReactElement<{ className?: string }>;
}

export default function CardPostButton({
  onClick,
  className,
  value,
  ...props
}: CardPostButtonProps) {
  return (
    <div className="flex items-center gap-1 w-fit group cursor-pointer">
      <button
        className={cx(
          "flex items-center justify-center cursor-pointer p-2 rounded-xl group-hover:bg-primary/30 ",
          className
        )}
        onClick={onClick}
        {...props}
      >
        {React.isValidElement(props.icon) &&
          React.isValidElement(props.icon) &&
          React.cloneElement(props.icon, {
            className: cx(
              "text-color-2 group-hover:text-primary",
              props.icon.props.className
            ),
          })}
      </button>
      {value && (
        <TextDescription className="text-color-2 text-md font-bold mt-1 group-hover:text-primary">
          {value}
        </TextDescription>
      )}
    </div>
  );
}
