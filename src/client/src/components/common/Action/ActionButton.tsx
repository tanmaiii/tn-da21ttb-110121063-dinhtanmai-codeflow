import { MyTooltip } from '@/components/common/MyTooltip';
import { Button } from '@/components/ui/button';
import { IconPlus, IconPrinter } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

type ActionButtonType =
  | 'update'
  | 'delete'
  | 'view'
  | 'create'
  | 'default'
  | 'restore'
  | 'delete-soft'
  | 'button'
  | 'export';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  actionType?: ActionButtonType;
  label?: string;
  icon?: React.ReactNode;
}

export default function ActionButton({
  actionType = 'default',
  label,
  icon,
  ...props
}: ActionButtonProps) {
  const t = useTranslations('common');

  if (actionType === 'default') {
    return (
      <MyTooltip content={t('action')}>
        <Button variant="outline" size="sm" className="w-fit" {...props}>
          {icon}
          {label}
        </Button>
      </MyTooltip>
    );
  }

  if (actionType === 'restore') {
    return (
      <MyTooltip content={t('restore')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {icon}
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'delete') {
    return (
      <MyTooltip content={t('delete')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {icon}
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'update') {
    return (
      <MyTooltip content={t('update')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {icon}
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'delete-soft') {
    return (
      <MyTooltip content={t('deleteSoft')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'view') {
    return (
      <MyTooltip content={t('view')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {icon}
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'export') {
    return (
      <MyTooltip content={t('export')}>
        <Button
          variant="default"
          size="sm"
          className="bg-blue-400 text-white hover:bg-blue-500 hover:text-white flex items-center gap-2"
          {...props}
        >
          <IconPrinter />
          {label ? label : t('export')}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'create') {
    return (
      <MyTooltip content={t('create')}>
        <Button
          variant="default"
          size="sm"
          className="w-fit bg-primary text-white hover:bg-primary/90"
          {...props}
        >
          <IconPlus className="w-4 h-4" />
          {label ? label : t('create')}
        </Button>
      </MyTooltip>
    );
  }
}
