import MyBadge from '@/components/common/MyBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TextHeading from '@/components/ui/text';
import { STATUS_TOPIC } from '@/constants/object';
import { IconBook } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface TopicInfoProps {
  title: string;
  description?: string;
  status: string;
}

export default function TopicInfo({ title, description, status }: TopicInfoProps) {
  const t = useTranslations('repos');
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconBook className="size-5" />
          {t('topic')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <TextHeading className="font-semibold">{title}</TextHeading>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">{t('statusTopic')}:</span>
            <MyBadge className="w-fit" status={STATUS_TOPIC.find(item => item.value === status)!} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
