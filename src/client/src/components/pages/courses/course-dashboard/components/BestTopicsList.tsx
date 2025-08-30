import DataExport from '@/components/common/DataTable/data-export';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading from '@/components/ui/text';
import { paths } from '@/data/path';
import useQ_Topic_GetAllStatsByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllStatsByCourseId';
import { ITopicStats } from '@/interfaces/topic';
import { IconCode, IconDashboard } from '@tabler/icons-react';
import { GitCommit, GitPullRequest, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function BestTopicsList({ courseId }: { courseId: string }) {
  const t = useTranslations('dashboard.lists.bestProjects');
  const [page, setPage] = useState(1);
  const { data: topics } = useQ_Topic_GetAllStatsByCourseId({
    courseId: courseId,
    params: {
      page: page,
      limit: 10,
      sortBy: 'totalCommits',
    },
  });

  const exportData = useMemo(() => {
    if (topics?.data.length === 0) return [];
    return (
      topics?.data?.map(item => ({
        name: item.title,
        members: item.members?.map(member => member.user?.name).join(', '),
        commit: item.commit?.total,
        pullRequest: item.pullRequest?.total,
        codeAnalysis: item.codeAnalysis?.total,
      })) ?? []
    );
  }, [topics?.data]);

  const columnsExport = useMemo(
    () => [
      { key: 'name', label: 'Name' },
      { key: 'members', label: 'Members' },
      { key: 'commit', label: 'Commit' },
      { key: 'pullRequest', label: 'Pull Request' },
      { key: 'codeAnalysis', label: 'CodeAnalysis' },
    ],
    [],
  );

  return (
    <Card className="lg:col-span-3 h-full">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            {t('title')}
          </CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </div>

        <DataExport
          columns={columnsExport}
          values={exportData}
          fileName={`${courseId}-topics.xlsx`}
        />
      </CardHeader>
      <CardContent className="h-full flex-1">
        {topics?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 h-full w-full">
            <IconDashboard className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">{'No best topics found'}</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {topics?.data.map((topic, index) => (
                <Topic key={topic.id} topic={topic} index={index} />
              ))}
            </div>
            <MyPagination
              totalItem={topics?.pagination.totalItems ?? 0}
              currentPage={topics?.pagination.currentPage ?? 1}
              totalPages={topics?.pagination.totalPages ?? 1}
              onPageChange={value => setPage(value)}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

const Topic = ({ topic, index }: { topic: ITopicStats; index: number }) => {
  // const t = useTranslations('dashboard.lists.bestProjects');

  return (
    <div className="group p-4 rounded-xl border border-border/50 transition-all flex flex-row justify-between duration-200 hover:shadow-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {index + 1}
              </div>
              {index < 3 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={paths.TOPICS_DETAIL(topic.id)}>
                <TextHeading className="font-medium" lineClamp={1}>
                  {topic.title}
                </TextHeading>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                {topic?.members
                  ?.slice(0, topic.members.length > 4 ? 2 : topic.members.length)
                  .map(member => {
                    return (
                      <MemberAvatar
                        key={member.id}
                        id={member?.user?.id}
                        name={member.user?.name}
                        size={24}
                        avatar={member.user?.avatar}
                      />
                    );
                  })}
                {topic?.members && topic.members.length > 2 && (
                  <span className="text-sm text-muted-foreground">...</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 text-sm">
            <IconCode className="w-4 h-4" />
            <span>{topic.codeAnalysis.total} analysis</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <GitCommit className="w-4 h-4" />
            <span>{topic.commit.total} commits</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <GitPullRequest className="w-4 h-4" />
            <span>{topic.pullRequest.total} pull requests</span>
          </div>
        </div>
      </div>

      <div className="text-sm font-medium text-gray-900 dark:text-white">
        <span className="text-green-600 font-semibold">+{topic.commit.additions ?? 0}</span>
        <span className="text-gray-400 mx-1">/</span>
        <span className="text-red-500 font-semibold">-{topic.commit.deletions ?? 0}</span>
      </div>
    </div>
  );
};
