import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import PasswordChangeModal from './PasswordChangeModal';

export function PasswordSection() {
  const t = useTranslations('settings');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('passwordTitle')}</CardTitle>
        <CardDescription>{t('passwordDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-row gap-2">
        <div className="w-200">
          <Input className='h-12 rounded-sm' value={'***************'} readOnly disabled />
        </div>
        <PasswordChangeModal />
      </CardContent>
    </Card>
  );
}
