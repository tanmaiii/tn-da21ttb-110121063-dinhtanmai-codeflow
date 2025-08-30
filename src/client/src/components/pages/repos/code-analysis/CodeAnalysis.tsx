import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import MySelect from '@/components/common/MySelect';
import { Label } from '@/components/ui/label';
import useQ_CodeAnalysis_GetByReposId from '@/hooks/query-hooks/CodeAnalysis/useQ_CodeAnalysis_GetByReposId';
import { IRepos } from '@/interfaces/repos';
import { IconCode } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CodeAnalysisItem from './CodeAnalysisItem';

const filterItem = [
  { label: 'common.newest', value: 'DESC' },
  { label: 'common.oldest', value: 'ASC' },
];

export default function CodeAnalysis({ repos }: { repos: IRepos }) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('DESC');
  const t = useTranslations();
  const [authorId, setAuthorId] = useState<string>('all');

  const Q_CodeAnalysis = useQ_CodeAnalysis_GetByReposId({
    params: {
      page: page,
      limit: 5,
      order: sortBy,
      authorId: authorId !== 'all' ? authorId : undefined,
    },
    reposId: repos.id,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Label>{Q_CodeAnalysis.data?.pagination.totalItems} Code Analysis</Label>
        <div className="flex gap-2">
          <MySelect
            options={[
              {
                labelKey: t('common.all'),
                value: 'all',
              },
              ...(repos.topic?.members?.map(member => {
                return {
                  labelKey: member.user?.name ?? '',
                  value: member.user?.id ?? '',
                };
              }) ?? []),
            ]}
            size="sm"
            defaultValue={authorId}
            name="authorId"
            className="min-w-[120px]"
            isTranslate={false}
            onChange={value => setAuthorId(value)}
          />

          <MySelect
            defaultValue={sortBy}
            options={
              filterItem.map(item => {
                return {
                  labelKey: item.label,
                  value: item.value,
                };
              }) ?? []
            }
            size="sm"
            className="min-w-[120px]"
            name="sortBy"
            onChange={value => setSortBy(value as 'ASC' | 'DESC')}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 min-h-[300px]">
        {Q_CodeAnalysis.data?.data.length === 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center h-100">
            <IconCode className="size-12 text-gray-500" />
            <h4 className="text-2xl font-bold">No code analysis found</h4>
            <p className="text-gray-500">There are no code analysis for this repository.</p>
          </div>
        ) : (
          Q_CodeAnalysis.data?.data.map(pr => (
            <CodeAnalysisItem key={pr.id} data={pr} repos={repos} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-auto">
        {Q_CodeAnalysis.data && (
          <MyPagination
            currentPage={page}
            totalPages={Q_CodeAnalysis.data?.pagination?.totalPages || 0}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
