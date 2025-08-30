import DataExport from '@/components/common/DataTable/data-export';
import { MemberContributeCard } from '@/components/common/MemberContributeCard';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import MySelect from '@/components/common/MySelect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useQ_Course_Contributors from '@/hooks/query-hooks/Course/useQ_Course_Contributors';
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

const options = [
  { label: 'Commit', value: 'commit' },
  { label: 'Pull Request', value: 'pullRequest' },
  { label: 'Code Analysis', value: 'codeAnalysis' },
];

export default function ActiveStudentsList({ courseId }: { courseId: string }) {
  const t = useTranslations('dashboard.lists.activeStudents');
  const LIMIT = 4;
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('commit');

  const {
    data: contributors,
    isLoading,
    error,
  } = useQ_Course_Contributors({
    id: courseId,
    params: {
      page,
      limit: LIMIT,
      sortBy: sortBy,
    },
  });

  const columnsExport = useMemo(
    () => [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'commit', label: 'Commit' },
      { key: 'pullRequest', label: 'Pull Request' },
      { key: 'codeAnalysis', label: 'CodeAnalysis' },
    ],
    [],
  );

  // Memoize export data to prevent unnecessary recalculations
  const exportData = useMemo(() => {
    if (contributors?.data.length === 0) return [];
    return (
      contributors?.data?.map(item => ({
        name: item.author?.name,
        email: item.author?.email,
        commit: item.commit.total,
        pullRequest: item.pullRequest.total,
        codeAnalysis: item.codeAnalysis.total,
      })) ?? []
    );
  }, [contributors?.data]);

  // Handle error state
  if (error) {
    return (
      <Card className="lg:col-span-3">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <p className="text-red-700">{'Failed to load active students data'}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle empty state
  const hasContributors = contributors?.data && contributors.data.length > 0;

  return (
    <Card className="lg:col-span-3">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {t('title')}
          </CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </div>
        {hasContributors && (
          <div className="flex items-center gap-2">
            <MySelect
              name="sortBy"
              options={[
                ...(options.map(option => {
                  return {
                    labelKey: option.label,
                    value: option.value.toString(),
                  };
                }) ?? []),
              ]}
              isTranslate={false}
              defaultValue={sortBy}
              onChange={value => setSortBy(value)}
              size="sm"
            />
            <DataExport
              columns={columnsExport}
              values={exportData}
              fileName={`${courseId}-contributors.xlsx`}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="h-full">
        {isLoading ? (
          <div className="space-y-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
            {Array.from({ length: LIMIT }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : !hasContributors ? (
          <div className="flex flex-col items-center justify-center py-40 h-full w-full">
            <Users className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">{'No active students found'}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                {contributors?.data?.slice(0, LIMIT / 2).map((contributor, index) => (
                  <MemberContributeCard
                    number={index + 1 + (page - 1) * LIMIT}
                    key={contributor.authorId}
                    contributor={contributor}
                  />
                ))}
              </div>
              <div className="space-y-4">
                {contributors?.data?.slice(LIMIT / 2, LIMIT).map((contributor, index) => (
                  <MemberContributeCard
                    number={index + LIMIT / 2 + 1 + (page - 1) * LIMIT}
                    key={contributor.authorId}
                    contributor={contributor}
                  />
                ))}
              </div>
            </div>
            <MyPagination
              totalItem={contributors.pagination.totalItems ?? 0}
              currentPage={contributors.pagination.currentPage ?? 1}
              totalPages={contributors.pagination.totalPages ?? 1}
              onPageChange={value => setPage(value)}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
