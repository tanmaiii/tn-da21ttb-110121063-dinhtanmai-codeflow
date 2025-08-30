import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { TextDescription } from '@/components/ui/text';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { toast } from 'sonner';
import ActionModal from './ActionModal';

interface ActionStatusProps {
  statusKey?: string;
  handleSubmit: () => void;
  icon?: React.ReactNode;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function ActionStatus({
  statusKey = 'this item',
  handleSubmit,
  icon,
  onSuccess,
  onError,
}: ActionStatusProps) {
  const t = useTranslations('common');
  const queryClient = useQueryClient();
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      return await handleSubmit();
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      onSuccess?.();
      queryClient.invalidateQueries();
      buttonCloseRef.current?.click();
    },
    onError: () => {
      toast.error(t('updateError'));
      onError?.();
    },
  });

  return (
    <ActionModal
      actionType={icon ? 'default' : 'status'}
      title={t('updateStatusTitle')}
      icon={icon}
    >
      <TextDescription className="text-md text-color-1">
        {t('updateStatusConfirm', { title: statusKey })}
      </TextDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button ref={buttonCloseRef} variant="outline">
            {t('cancel')}
          </Button>
        </DialogClose>
        <Button variant="default" onClick={() => mutation.mutate()}>
          {t('update')}
        </Button>
      </DialogFooter>
    </ActionModal>
  );
}
