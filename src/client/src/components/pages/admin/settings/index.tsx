import TitleHeader from '@/components/layout/TitleHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Settings() {
  const t = useTranslations('settings');
  return (
    <div className="container mx-auto py-6 space-y-6 flex flex-col gap-6">
      <div className="space-y-2">
        <TitleHeader title={t('title')} description={t('description')} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Tabs defaultValue="ai" className="space-y-6 max-w-3xl w-full gap-0">
          <TabsList className="grid w-full grid-cols-2">
            {/* <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              {t('ai')}
            </TabsTrigger> */}
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              {t('general')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ai" className="space-y-6 "> 
            {/* <AiSettings /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
