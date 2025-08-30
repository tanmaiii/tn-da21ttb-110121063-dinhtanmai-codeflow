import TitleHeader from '@/components/layout/TitleHeader';
import { Card } from '@/components/ui/card';
import useQ_Topic_Stats from '@/hooks/query-hooks/Topic/useQ_Topic_Stats';
import { ITopic } from '@/interfaces/topic';
import { IconGitPullRequest } from '@tabler/icons-react';
import { CheckCircle, Code2, GitCommit } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MetricCard from './MetricCard';
import { util_format_number_compact } from '@/utils/common';

export default function ContributeSynthetic({ topic }: { topic: ITopic }) {
  const t = useTranslations('topic.contribute');

  const { data } = useQ_Topic_Stats({ id: topic?.id });

  return (
    <Card className="p-4 md:p-8">
      <div className="flex items-center gap-3">
        <TitleHeader className="mb-2" title={topic?.title} onBack={true} />
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={GitCommit}
          title={t('totalCommits')}
          value={util_format_number_compact(data?.data?.commit.total ?? 0)}
          subtitle={`${t('commitsInTopic')}`}
          gradient="bg-gradient-to-r from-blue-500 to-blue-600"
          textColor="text-blue-700 dark:text-blue-400"
        />
        <MetricCard
          icon={Code2}
          title={t('totalAdditions')}
          value={util_format_number_compact(data?.data?.commit.additions ?? 0)}
          subtitle={`${t('additionsInTopic')}`}
          gradient="bg-gradient-to-r from-green-500 to-green-600"
          textColor="text-green-700 dark:text-green-400"
        />
        <MetricCard
          icon={CheckCircle}
          title={t('codeAnalysis')}
          value={util_format_number_compact(data?.data?.codeAnalysis.total ?? 0)}
          subtitle={`${data?.data?.codeAnalysis.success} ${t('codeAnalysisSuccess')}`}
          gradient="bg-gradient-to-r from-purple-500 to-purple-600"
          textColor="text-purple-700 dark:text-purple-400"
        />
        <MetricCard
          icon={IconGitPullRequest}
          title={t('pullRequests')}
          value={util_format_number_compact(data?.data?.pullRequest.total ?? 0)}
          subtitle={`${data?.data?.pullRequest.merged} ${t('pullRequestsMerged')}`}
          gradient="bg-gradient-to-r from-amber-500 to-orange-600"
          textColor="text-amber-700 dark:text-amber-400"
        />
      </div>
    </Card>
  );
}
