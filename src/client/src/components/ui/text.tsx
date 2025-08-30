import { cn } from '@/lib/utils';

type LineClampProps = {
  lineClamp?: number;
};

export default function TextHeading({
  className,
  lineClamp,
  ...props
}: React.ComponentPropsWithoutRef<'h4'> & LineClampProps) {
  return (
    <h4
      className={cn(
        'flex items-left gap-2 text-base text-left leading-none font-bold group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        lineClamp && `line-clamp-${lineClamp} overflow-hidden text-ellipsis `,
        className,
      )}
      {...props}
    >
      {props.children}
    </h4>
  );
}

export function TextDescription({
  className,
  lineClamp,
  ...props
}: React.ComponentPropsWithoutRef<'span'> & LineClampProps) {
  return (
    <span
      className={cn(
        'text-sm font-normal text-muted-foreground leading-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-20',
        lineClamp && `line-clamp-${lineClamp} overflow-hidden text-ellipsis `,
        className,
      )}
      {...props}
    >
      {props.children}
    </span>
  );
}
