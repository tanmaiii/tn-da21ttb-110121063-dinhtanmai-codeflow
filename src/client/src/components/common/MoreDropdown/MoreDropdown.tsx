'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon } from 'lucide-react';
import { useState } from 'react';
import ActionDeleteModal from '../Action/ActionDeleteModal';
import { cx } from 'class-variance-authority';
import React from 'react';

export interface DropdownAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isVisible?: boolean;
  isDeleteAction?: boolean;
}

interface MoreDropdownProps {
  actions: DropdownAction[];
  className?: string;
  deleteItemName?: string;
  onDelete?: () => Promise<unknown>;
  /**
   * Custom trigger element. If not provided, default button will be used.
   */
  trigger?: React.ReactNode;
  /**
   * Button props for default trigger button.
   * Only used when custom trigger is not provided.
   */
  buttonProps?: ButtonProps;
}

export default function MoreDropdown({
  actions,
  className,
  deleteItemName = '',
  onDelete,
  trigger,
  buttonProps,
}: MoreDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentDeleteAction, setCurrentDeleteAction] = useState<DropdownAction | null>(null);

  const handleActionClick = (action: DropdownAction) => {
    setIsDropdownOpen(false);

    if (action.isDeleteAction) {
      setCurrentDeleteAction(action);
      setShowDeleteDialog(true);
    } else {
      action.onClick();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      return onDelete();
    }
    if (currentDeleteAction) {
      currentDeleteAction.onClick();
    }
    return Promise.resolve();
  };

  const visibleActions = actions.filter(action => action.isVisible !== false);

  return (
    <div className={className}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          {trigger || (
            <Button 
              variant="rounded" 
              size="icon" 
              className={cx('bg-white/20 ')} 
              {...buttonProps}
            >
              <EllipsisIcon size={26} className="text-color-1" />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {visibleActions.map(action => (
            <DropdownMenuItem
              key={action.id}
              className="cursor-pointer"
              onClick={() => handleActionClick(action)}
            >
              <span className="mr-2">{action.icon}</span>
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {showDeleteDialog && (
        <ActionDeleteModal
          title={deleteItemName || currentDeleteAction?.label || ''}
          onSubmit={handleDelete}
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
        />
      )}
    </div>
  );
}
