'use client';

import DataExport from '@/components/common/DataTable/data-export';
import { STATUS_HIDDEN } from '@/constants/object';
import { ICommentSimple } from '@/interfaces/comment';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface CommentsExportProps {
  data: ICommentSimple[];
}

export default function CommentsExport({ data }: CommentsExportProps) {
  const t = useTranslations();
  const tCommon = useTranslations('common');

  const columnsExport = useMemo(
    () => [
      { key: 'content', label: 'content' },
      { key: 'author', label: 'author' },
      { key: 'status', label: 'status' },
      { key: 'createdAt', label: tCommon('createdAt') },
      { key: 'updatedAt', label: tCommon('updatedAt') },
      { key: 'deletedAt', label: tCommon('deletedAt') },
    ],
    [tCommon],
  );

  const transformCommentForExport = (comment: ICommentSimple) => {
    const statusType = !comment.status ? 'hidden' : 'visible';
    const statusLabel = STATUS_HIDDEN.find(item => item.value === statusType)?.labelKey ?? '';

    return {
      ...comment,
      content: comment.content || '',
      author: comment.author?.name || '',
      status: t(statusLabel),
      createdAt: comment.createdAt ? utils_DateToDDMMYYYY(comment.createdAt) : '',
      updatedAt: comment.updatedAt ? utils_DateToDDMMYYYY(comment.updatedAt) : '',
      deletedAt: comment.deletedAt ? utils_DateToDDMMYYYY(comment.deletedAt) : '',
    };
  };

  return (
    <DataExport
      values={data.map(transformCommentForExport)}
      columns={columnsExport}
      fileName="comments.xlsx"
    />
  );
}
