import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-background-3 dark:bg-background-1', className)}
      {...props}
    />
  );
}

export { Skeleton };
