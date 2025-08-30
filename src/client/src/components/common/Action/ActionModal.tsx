import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ActionIcon, { ActionIconProps } from './ActionIcon';
export interface ActionModalProps extends ActionIconProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function ActionModal({
  title,
  description,
  children,
  icon,
  className,
  ...props
}: ActionModalProps) {
  if (props.actionType === 'non-icon') {
    return (
      <Dialog>
        <DialogTrigger asChild>{icon}</DialogTrigger>
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

  if (props.actionType === 'default') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <ActionIcon {...props}>{icon}</ActionIcon>
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ActionIcon {...props} />
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
