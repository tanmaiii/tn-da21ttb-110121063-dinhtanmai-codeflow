'use client';

import DataExport from '@/components/common/DataTable/data-export';
import { IRepos } from '@/interfaces/repos';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface ReposExportProps {
  data: IRepos[];
}

export default function ReposExport({ data }: ReposExportProps) {
  const t = useTranslations('repos');
  const tCommon = useTranslations('common');

  const columnsExport = useMemo(
    () => [
      { key: 'name', label: t('name') },
      { key: 'url', label: 'GitHub URL' },
      { key: 'topic', label: 'Topic' },
      { key: 'author', label: t('author') },
      { key: 'createdAt', label: tCommon('createdAt') },
      { key: 'updatedAt', label: tCommon('updatedAt') },
    ],
    [t, tCommon],
  );

  const transformReposForExport = (repos: IRepos) => {
    return {
      ...repos,
      topic: repos.topic?.title || '',
      author: repos.author?.name || '',
      createdAt: repos.createdAt ? utils_DateToDDMMYYYY(repos.createdAt) : '',
      updatedAt: repos.updatedAt ? utils_DateToDDMMYYYY(repos.updatedAt) : '',
    };
  };

  return (
    <DataExport
      values={data.map(transformReposForExport)}
      columns={columnsExport}
      fileName="repositories.xlsx"
    />
  );
}
