'use client';

import DataExport from '@/components/common/DataTable/data-export';
import { STATUS_TOPIC, STATUS_TOPIC_CUSTOM } from '@/constants/object';
import { ITopic } from '@/interfaces/topic';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface TopicsExportProps {
  data: ITopic[];
}

export default function TopicsExport({ data }: TopicsExportProps) {
  const t = useTranslations();
  const tTopic = useTranslations('topic');
  const tCommon = useTranslations('common');

  const columnsExport = useMemo(
    () => [
      { key: 'title', label: tTopic('title') },
      { key: 'course', label: tTopic('course') },
      { key: 'author', label: tTopic('author') },
      { key: 'status', label: tTopic('status') },
      { key: 'isCustom', label: 'Type' },
      { key: 'members', label: 'Members' },
      { key: 'createdAt', label: tTopic('createdAt') },
    ],
    [tTopic, tCommon],
  );

  const transformTopicForExport = (topic: ITopic) => {
    const statusLabel = STATUS_TOPIC.find(item => item.value === topic.status)?.labelKey ?? '';
    const isCustomLabel =
      STATUS_TOPIC_CUSTOM.find(item => item.value === (topic.isCustom ? 'custom' : 'suggest'))
        ?.labelKey ?? '';

    const membersNames =
      topic.members
        ?.map(member => member.user?.name)
        .filter(Boolean)
        .join(', ') || '';

    return {
      ...topic,
      course: topic.course?.title || '',
      author: topic.author?.name || '',
      status: t(statusLabel),
      isCustom: t(isCustomLabel),
      members: membersNames,
      createdAt: topic.createdAt ? utils_DateToDDMMYYYY(topic.createdAt) : '',
    };
  };

  return (
    <DataExport
      values={data.map(transformTopicForExport)}
      columns={columnsExport}
      fileName="topics.xlsx"
    />
  );
}
