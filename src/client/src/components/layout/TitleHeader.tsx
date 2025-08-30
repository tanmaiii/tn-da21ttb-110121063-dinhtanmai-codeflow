'use client';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import TextHeading from '../ui/text';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
interface TitleHeaderProps {
  title: string;
  description?: string;
  onBack?: boolean;
  className?: string;
  rightContent?: React.ReactNode;
}

function TitleHeader({ title, description, onBack, className, rightContent }: TitleHeaderProps) {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      router.back();
    }
  };

  return (
    <div className={cn('flex items-center justify-between gap-2 pb-4', className)}>
      <div className="flex items-center gap-2">
        {onBack && (
          <Button type="button" variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
        )}
        <div className="flex flex-col gap-0">
          <TextHeading className="text-2xl">{title}</TextHeading>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
    </div>
  );
}

export default TitleHeader;
