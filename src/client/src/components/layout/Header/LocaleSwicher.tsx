'use client';

import { SVGS } from '@/data/images';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { setCurrentLocale } from '@/lib/utils';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const locales = [
  {
    value: 'vi',
    label: 'Tiếng Việt',
    flag: SVGS.VI,
    alt: 'Vietnamese'
  },
  {
    value: 'en',
    label: 'English',
    flag: SVGS.EN,
    alt: 'English'
  },
  {
    value: 'ja',
    label: '日本語',
    flag: SVGS.JA,
    alt: 'Japanese'
  },
  {
    value: 'cp',
    label: 'ភាសាខ្មែរ',
    flag: SVGS.CP,
    alt: 'Khmer'
  }
];


export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
    router.push(`/${newLocale}${pathname?.replace(/^\/(en|vi|ja|cp)/, '')}`);
  };

  useEffect(() => {
    setCurrentLocale(currentLocale);
  }, [currentLocale]);

  const currentLocaleData = locales.find(locale => locale.value === currentLocale);

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-auto border-none shadow-none bg-background-2 hover:bg-accent/50 transition-colors">
        <SelectValue>
          <div className="flex items-center gap-2">
            {currentLocaleData && (
              <>
                <Image
                  src={currentLocaleData.flag}
                  alt={currentLocaleData.alt}
                  width={20}
                  height={14}
                  className="rounded-sm"
                />
                <span className="text-sm font-medium">
                  {currentLocale.toUpperCase()}
                </span>
              </>
            )}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((locale) => (
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
  );
}
