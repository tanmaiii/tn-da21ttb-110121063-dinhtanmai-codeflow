'use client';
import PasswordInput from '@/components/common/Input/PasswordInput/PasswordInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ENUM_TYPE_SYSTEM_SETTINGS } from '@/constants/enum';
import GeminiService from '@/services/gemini.service';
import SystemSettingsService from '@/services/system_settings.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AiSettings() {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');
  const [aiApiKey, setAiApiKey] = useState('');

  const { data: geminiToken } = useQuery({
    queryKey: ['system-settings', ENUM_TYPE_SYSTEM_SETTINGS.GEMINI_TOKEN],
    queryFn: () => SystemSettingsService.getSettingByKey(ENUM_TYPE_SYSTEM_SETTINGS.GEMINI_TOKEN),
  });

  useEffect(() => {
    if (geminiToken?.data?.value) {
      setAiApiKey(geminiToken.data.value);
    }
  }, [geminiToken]);

  const { mutate: testGemini, isPending: isTestingGemini } = useMutation({
    mutationFn: () => GeminiService.test(),
    onSuccess: () => {
      toast.success(tCommon('createSuccess'));
    },
    onError: () => {
      toast.error(tCommon('createError'));
    },
  });

  const { mutate: saveGeminiToken, isPending: isSavingGeminiToken } = useMutation({
    mutationFn: () =>
      SystemSettingsService.updateSetting(ENUM_TYPE_SYSTEM_SETTINGS.GEMINI_TOKEN, {
        value: aiApiKey,
      }),
    onSuccess: () => {
      toast.success(tCommon('updateSuccess'));
    },
    onError: () => {
      toast.error(tCommon('updateError'));
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('ai')}</CardTitle>
        <CardDescription>{t('aiDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex flex-row gap-2 items-center border-b pb-2 mb-2">
            <div className="bg-gray-100 rounded-xl py-2 px-2.5 w-fit">🤖</div>
            <TextHeading className="text-lg font-bold">Gemini Flash API Configuration</TextHeading>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-500">{t('aiApiKey')}:</Label>
            <div className="space-y-2 flex flex-row gap-2 items-end">
              <PasswordInput
                className="h-13 w-full text-base rounded-md border-gray-300 mb-0"
                placeholder={t('aiApiKey')}
                value={aiApiKey || ''}
                onChange={e => setAiApiKey(e.target.value)}
              />
              {isTestingGemini ? (
                <Button variant="secondary" className="h-13 w-20 rounded-md" disabled>
                  loading...
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="h-13 w-20 rounded-md"
                  onClick={() => testGemini()}
                >
                  {tCommon('test')}
                </Button>
              )}
            </div>
            <TextDescription>
              Get your API key from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Google AI Studio
              </a>
            </TextDescription>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-end">
          <Button variant="outline" className="w-fit">
            🔄️ {tCommon('reset')}
          </Button>
          <Button className="w-fit" onClick={() => saveGeminiToken()} disabled={isSavingGeminiToken}>
            💾 {tCommon('save')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
