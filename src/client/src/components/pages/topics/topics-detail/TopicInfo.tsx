import ActionIcon from '@/components/common/Action/ActionIcon';
import MyBadge from '@/components/common/MyBadge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TextHeading from '@/components/ui/text';
import { STATUS_TOPIC } from '@/constants/object';
import { paths } from '@/data/path';
import { ITopic } from '@/interfaces/topic';
import { useUserStore } from '@/stores/user_store';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconChartBar } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TopicInfo({ topic }: { topic: ITopic }) {
  const { user } = useUserStore();
  const router = useRouter();
  const t = useTranslations('topic');
  const isLeader =
    user?.id === topic?.members?.find(member => member.role === 'leader')?.userId ||
    topic?.members?.[0]?.userId === user?.id;

  return (
    <Card className="p-3 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-slate-600 to-zinc-700 shadow-sm">
            <IconChartBar className="w-6 h-6 text-white" />
          </div>
          <TextHeading className="text-lg/4 font-bold">{t('infoTopic')}</TextHeading>
        </div>

        {isLeader && (
          <ActionIcon
            actionType="update"
            onClick={() => router.push(paths.TOPIC_UPDATE(topic.id))}
          />
        )}
      </div>
      <div className="space-y-3">
        <div>
          <span className="text-md">{topic?.description}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('groupName')}</span>
          <span className="text-sm">{topic?.groupName}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('members')}</span>
          <span className="text-sm">{topic?.members?.length}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('status')}</span>
          <MyBadge
            status={STATUS_TOPIC.find(status => status.value === topic.status) ?? STATUS_TOPIC[0]}
          />
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('createdAt')}</span>
          <span className="text-sm">{utils_DateToDDMMYYYY(topic?.createdAt ?? '')}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('course')}</span>
          <Link
            href={`/courses/${topic?.course?.id}`}
            className="hover:text-blue-600 transition-colors text-sm"
          >
            {topic?.course?.title}
          </Link>
        </div>
      </div>
    </Card>
  );
}
