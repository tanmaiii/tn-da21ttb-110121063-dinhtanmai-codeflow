import * as React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface MyTooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function MyTooltip({ content, children, className }: MyTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={cn('', className)}>
          {typeof content === 'string' ? <p className="text-white">{content}</p> : content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default MyTooltip;
