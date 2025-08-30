import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import useQ_Settings_GetMe from '@/hooks/query-hooks/Settings/useQ_Settings_GetMe';
import useM_Settings_Update from '@/hooks/query-hooks/Settings/useM_Settings_Update';
import { Mail, Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function NotificationsTab() {
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
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('notificationsTitle')}</CardTitle>
          <CardDescription>{t('notificationsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('notificationsTitle')}</CardTitle>
        <CardDescription>{t('notificationsDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <Label>{t('emailNotifications')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('emailNotificationsDescription')}
                </p>
              </div>
            </div>
            <Switch
              checked={settings?.receiveEmail || false}
              onCheckedChange={checked => handleChange('receiveEmail', checked)}
              disabled={updateMutation.isPending}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <Label>{t('pushNotifications')}</Label>
                <p className="text-sm text-muted-foreground">{t('pushNotificationsDescription')}</p>
              </div>
            </div>
            <Switch
              checked={settings?.receivePush || false}
              onCheckedChange={checked => handleChange('receivePush', checked)}
              disabled={updateMutation.isPending}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('projectUpdates')}</Label>
              <p className="text-sm text-muted-foreground">{t('projectUpdatesDescription')}</p>
            </div>
            <Switch
              checked={settings?.projectUpdates || false}
              onCheckedChange={checked => handleChange('projectUpdates', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('securityAlerts')}</Label>
              <p className="text-sm text-muted-foreground">{t('securityAlertsDescription')}</p>
            </div>
            <Switch
              checked={settings?.securityAlerts || false}
              onCheckedChange={checked => handleChange('securityAlerts', checked)}
              disabled={updateMutation.isPending}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
