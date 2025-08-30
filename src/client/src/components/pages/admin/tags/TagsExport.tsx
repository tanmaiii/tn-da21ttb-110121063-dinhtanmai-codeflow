'use client';

import DataExport from '@/components/common/DataTable/data-export';
import { ITag } from '@/interfaces/tags';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface TagsExportProps {
  data: ITag[];
}

export default function TagsExport({ data }: TagsExportProps) {
  const tTag = useTranslations('tag');
  const tCommon = useTranslations('common');

  const columnsExport = useMemo(
    () => [
      { key: 'name', label: tTag('name') },
      { key: 'description', label: tTag('description') },
      { key: 'createdAt', label: tCommon('createdAt') },
      { key: 'updatedAt', label: tCommon('updatedAt') },
      { key: 'deletedAt', label: tCommon('deletedAt') },
    ],
    [tTag, tCommon],
  );

  const transformTagForExport = (tag: ITag) => {
    return {
      ...tag,
      name: tag.name || '',
      description: tag.description || '',
      createdAt: tag.createdAt ? utils_DateToDDMMYYYY(tag.createdAt) : '',
      updatedAt: tag.updatedAt ? utils_DateToDDMMYYYY(tag.updatedAt) : '',
      deletedAt: tag.deletedAt ? utils_DateToDDMMYYYY(tag.deletedAt) : '',
    };
  };

  return (
    <DataExport
      values={data.map(transformTagForExport)}
      columns={columnsExport}
      fileName="tags.xlsx"
    />
  );
}
