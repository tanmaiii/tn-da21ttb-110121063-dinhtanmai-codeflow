'use client';
import { TopicListSkeleton } from '@/components/skeletons/topic';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import useQ_Topic_GetDetail from '@/hooks/query-hooks/Topic/useQ_Topic_GetDetail';
import { IconStar } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { notFound, useParams } from 'next/navigation';
import ContributeMembers from './contribute/ContributeMembers';
import ContributeSynthetic from './contribute/ContributeSynthetic';
import ContributionChart from './contribute/ContributionChart';
import TopicsEvaluation from './evaluation/TopicsEvaluation';
import TopicsRepos from './repository/TopicsRepos';
import TopicInfo from './TopicInfo';
import TopicMember from './TopicMember';

export default function Topics_Detail() {
  const params = useParams();
  const id = params?.id as string;
  const t = useTranslations('topic');
  const { data: dataTopic, isLoading, isError } = useQ_Topic_GetDetail({ id: id as string });

  if (isLoading) return <TopicListSkeleton />;
  if (isError) return notFound();

  if (!dataTopic?.data) return notFound();

  return (
    <div className="min-h-screen p-2 md:p-6">
      <div className="mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-8 space-y-8">
            {dataTopic?.data && <ContributeSynthetic topic={dataTopic?.data} />}

            <Card className="relative p-4 md:p-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg">
                  <IconStar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <TextHeading className="text-xl font-bold">{t('evaluation')}</TextHeading>
                  <TextDescription className="text-sm text-zinc-600 dark:text-zinc-300">
                    {t('evaluationDescription')}
                  </TextDescription>
                </div>
              </div>

              {dataTopic?.data && <TopicsEvaluation topic={dataTopic?.data} />}
            </Card>

            {dataTopic?.data && <ContributionChart topic={dataTopic.data} />}

            {dataTopic?.data && <ContributeMembers topic={dataTopic.data} />}
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-4">
            <div className="sticky top-24 flex flex-col gap-6">
              <TopicInfo topic={dataTopic?.data} />
              <TopicsRepos topic={dataTopic?.data} />
              <TopicMember topic={dataTopic?.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
