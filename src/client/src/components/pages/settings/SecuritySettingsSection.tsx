import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useM_Settings_Update from '@/hooks/query-hooks/Settings/useM_Settings_Update';
import useQ_Settings_GetMe from '@/hooks/query-hooks/Settings/useQ_Settings_GetMe';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCallback } from 'react';

export function SecuritySettingsSection() {
  const t = useTranslations('settings');

  const { data: settings, isLoading } = useQ_Settings_GetMe();
  const queryClient = useQueryClient();

  const updateMutation = useM_Settings_Update({
    options: {
      onSuccess: () => {
        toast.success(t('settingsUpdated') || 'Settings updated successfully');
        queryClient.invalidateQueries({ queryKey: ['settings'] });
      },
      onError: error => {
        console.error('Settings update error:', error);
        toast.error(t('settingsUpdateError') || 'Failed to update settings');
      },
    },
  });

  const handleChange = useCallback(
    (key: string, value: boolean) => {
      updateMutation.mutate({ [key]: value });
    },
    [updateMutation],
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('securityPrivacyTitle')}</CardTitle>
        <CardDescription>{t('securityPrivacyDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('showOnlineStatus')}</Label>
              <p className="text-sm text-muted-foreground">{t('showOnlineStatusDescription')}</p>
            </div>
            <Switch
              checked={settings?.onlineStatus}
              onCheckedChange={checked => handleChange('onlineStatus', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
