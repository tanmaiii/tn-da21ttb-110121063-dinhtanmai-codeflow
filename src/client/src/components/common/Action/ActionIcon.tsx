import { Button } from '@/components/ui/button';
import { Pencil, Trash, Eye, Plus, CircleCheck, RotateCcw, Archive } from 'lucide-react';
import { MyTooltip } from '@/components/common/MyTooltip';
import { useTranslations } from 'next-intl';
type ActionType =
  | 'update'
  | 'delete'
  | 'view'
  | 'create'
  | 'default'
  | 'non-icon'
  | 'status'
  | 'restore'
  | 'delete-soft'
  | 'button';

export interface ActionIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  actionType?: ActionType;
  children?: React.ReactNode;
}

export default function ActionIcon({
  actionType = 'default',
  children,
  ...props
}: ActionIconProps) {
  const t = useTranslations('common');

  if (actionType === 'default') {
    return (
      <MyTooltip content={t('action')}>
        <Button variant="outline" size="sm" className="w-fit" {...props}>
          {children}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'restore') {
    return (
      <MyTooltip content={t('restore')}>
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <RotateCcw />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'delete') {
    return (
      <MyTooltip content={t('delete')}>
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Trash />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'status') {
    return (
      <MyTooltip content={t('status')}>
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <CircleCheck />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'update') {
    return (
      <MyTooltip content={t('update')}>
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Pencil />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'delete-soft') {
    return (
      <MyTooltip content={t('deleteSoft')}>
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Archive />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'view') {
    return (
      <MyTooltip content={t('view')}>
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Eye />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'create') {
    return (
      <MyTooltip content={t('create')}>
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Plus />
        </Button>
      </MyTooltip>
    );
  }
}
