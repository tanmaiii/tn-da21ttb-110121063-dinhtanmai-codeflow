import { TextDescription } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  className?: string;
}

export default function SectionDivider({
  label,
  className,
  ...props
}: SectionDividerProps) {
  return (
    <div className={cn("relative w-full text-start", className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t text-color-2"></div>
      </div>
      {label && (
        <TextDescription className="relative font-medium bg-background-1 dark:bg-background-2 px-2 ml-2">
          {label}
        </TextDescription>
      )}
    </div>
  );
}
