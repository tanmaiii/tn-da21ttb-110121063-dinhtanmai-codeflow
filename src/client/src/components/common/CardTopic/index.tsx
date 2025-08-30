'use client';
import { Card, CardContent } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC } from '@/constants/object';
import { paths } from '@/data/path';
import { ITopic } from '@/interfaces/topic';
import apiConfig from '@/lib/api';
import { cn } from '@/lib/utils';
import { util_progress_color } from '@/utils/common';
import { utils_CalculateProgress, utils_DateToDDMMYYYY } from '@/utils/date';
import { IconBook2, IconCalendar } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import AvatarGroup from '../AvatarGroup';
import MyBadge from '../MyBadge';
import CardTopic_More from './CardTopicMore';

interface CardTopicProps {
  topic: ITopic;
}

export default function CardTopic({ topic }: CardTopicProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(paths.TOPICS_DETAIL(topic.id));
  };

  // Tính toán progress và màu sắc
  const progress = utils_CalculateProgress(
    topic.course?.startDate ?? '',
    topic.course?.topicDeadline ?? '',
  );
  const progressColor = util_progress_color(progress);

  return (
    <Card className="px-3 py-4 hover:border-white/30 rounded-md cursor-pointer bg-background-1 group/item h-full">
      <CardContent className="p-0 h-full flex flex-col gap-2 justify-between">
        <div className="flex flex-row justify-between items-center gap-2">
          <MyBadge
            className="w-fit"
            status={STATUS_TOPIC.find(item => item.value === topic.status)!}
          />
          <CardTopic_More topic={topic} />
        </div>
        <div className="flex flex-row items-center gap-1">
          <IconBook2 className="size-4 text-color-2" />
          <TextDescription lineClamp={1}>{topic.course?.title}</TextDescription>
        </div>
        <TextHeading lineClamp={2} className="text-xl mb-auto" onClick={onClick}>
          {topic.title}
        </TextHeading>
        <TextDescription lineClamp={2}>{topic.description}</TextDescription>
        <div className={cn('h-2 w-full relative right-0 bottom-0 rounded-md', progressColor.bg)}>
          <div
            className={cn(`h-2  w-full absolute left-0 bottom-0 rounded-md`, progressColor.text)}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-row items-end gap-1">
            <IconCalendar className="size-4 text-color-2" />
            <TextDescription lineClamp={2}>
              {utils_DateToDDMMYYYY(topic.course?.topicDeadline ?? '')}
            </TextDescription>
          </div>
          <div className="flex flex-row items-center justify-center align-middle gap-1">
            {/* <IconUser className="size-4 text-color-2 mr-2" /> */}
            {/* <TextDescription lineClamp={2}>{topic.members?.length ?? 1}</TextDescription> */}

            <AvatarGroup
              avatars={
                topic.members?.map(member => ({
                  url: member.user?.avatar
                    ? member.user?.avatar
                    : apiConfig.avatar(member.user?.name ?? 'c'),
                  name: member.user?.name ?? 'c',
                  alt: member.user?.name ?? 'c',
                })) ?? []
              }
              size={24}
              max={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
