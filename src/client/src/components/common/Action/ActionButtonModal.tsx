import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ActionButton, { ActionButtonProps } from './ActionButton';

export interface ActionButtonModalProps extends ActionButtonProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function ActionButtonModal({
  title,
  description,
  children,
  className,
  ...props
}: ActionButtonModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ActionButton {...props} />
      </DialogTrigger>
      <DialogContent className={cn('px-4', className)}>
        <DialogHeader>
          <DialogTitle className="px-2">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto px-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
