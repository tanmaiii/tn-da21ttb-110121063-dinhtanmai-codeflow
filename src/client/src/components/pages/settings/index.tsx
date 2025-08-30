'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Shield, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AppearanceTab } from './AppearanceTab';
import { PasswordSection } from './PasswordSection';
import { ProfileTab } from './ProfileTab';
import { SecuritySettingsSection } from './SecuritySettingsSection';

export default function Settings() {
  const t = useTranslations('settings');

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t('profile')}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {t('appearance')}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('security')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <AppearanceTab />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="space-y-6">
            <PasswordSection />

            <SecuritySettingsSection />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
