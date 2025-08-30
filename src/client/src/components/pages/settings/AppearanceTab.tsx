import { locales } from '@/components/layout/Header/LocaleSwicher';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { setCurrentLocale } from '@/lib/utils';
import { useThemeStore } from '@/stores/theme_store';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export function AppearanceTab() {
  const t = useTranslations('settings');
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  // const currentLocaleData = locales.find(locale => locale.value === currentLocale);

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
    router.push(`/${newLocale}${pathname?.replace(/^\/(en|vi|ja|cp)/, '')}`);
  };

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('appearanceTitle')}</CardTitle>
        <CardDescription>{t('appearanceDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-1">
              <Label>{t('theme')}</Label>
              <p className="text-sm text-muted-foreground">{t('themeDescription')}</p>
            </div>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('language')}</Label>
              <p className="text-sm text-muted-foreground">{t('languageDescription')}</p>
            </div>
            <Select value={currentLocale} onValueChange={handleLocaleChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locales.map(locale => (
                  <SelectItem key={locale.value} value={locale.value}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={locale.flag}
                        alt={locale.alt}
                        width={20}
                        height={14}
                        className="rounded-sm"
                      />
                      <span>{locale.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
