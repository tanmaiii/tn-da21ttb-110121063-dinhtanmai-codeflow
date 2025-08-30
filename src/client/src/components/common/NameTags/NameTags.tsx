import { paths } from "@/data/path";
import { ITag } from "@/interfaces/tags";
import { cn } from "@/lib/utils";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
interface NameTagsProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'onClick'> {
  max?: number;
  tags?: ITag[];
  className?: string;
}

export default function NameTags({
  tags,
  max = 3,
  className,
  ...rest
}: NameTagsProps) {
  const router = useRouter();
  if (tags?.length === 0 || !tags) return null;

  return (
    <p
      className={cx("flex flex-wrap gap-1.5 mt-2", className)}
      {...rest}
    >
      {tags?.slice(0, max).map((tag, index) => {
        return (
          <span
            key={tag.id || index}
            onClick={() => router.push(paths.TAG(tag.id))}
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              "bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
              "dark:bg-primary/20 dark:hover:bg-primary/30",
              "cursor-pointer"
            )}
          >
            {tag.name}
          </span>
        );
      })}
      {tags?.length > max && (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            "bg-muted text-muted-foreground hover:bg-muted/80 transition-colors",
            "dark:bg-muted/50 dark:hover:bg-muted/70"
          )}
        >
          +{tags?.length - max} more
        </span>
      )}
    </p>
  );
}
