import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconBrandGithub, IconCalendar, IconCode, IconEye, IconStack } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface RepositoryInfoProps {
  name: string;
  description?: string;
  language: string;
  framework: string;
  createdAt?: Date;
  onOpenRepository: () => void;
}

export default function RepositoryInfo({
  name,
  description,
  language,
  framework,
  createdAt,
  onOpenRepository,
}: RepositoryInfoProps) {
  const t = useTranslations('repos');
  const t_common = useTranslations('common');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-color-2/10 rounded-full">
              <IconBrandGithub className="size-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">{name}</CardTitle>
              {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={onOpenRepository}>
              <IconEye className="size-4 mr-2" />
              {t('viewGithub')}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <IconCode className="size-4 text-muted-foreground" />
            <span className="text-sm">{t('language')}:</span>
            <Badge variant="secondary">{language}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <IconStack className="size-4 text-muted-foreground" />
            <span className="text-sm">{t('framework')}:</span>
            <Badge variant="outline">{framework}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <IconCalendar className="size-4 text-muted-foreground" />
            <span className="text-sm">{t_common('createdAt')}:</span>
            <span className="text-sm text-muted-foreground">
              {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
