'use client';

import DataExport from '@/components/common/DataTable/data-export';
import { STATUS_HIDDEN } from '@/constants/object';
import { IPost } from '@/interfaces/post';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface PostsExportProps {
  data: IPost[];
}

export default function PostsExport({ data }: PostsExportProps) {
  const t = useTranslations();
  const tPost = useTranslations('post');
  const tCommon = useTranslations('common');

  const columnsExport = useMemo(
    () => [
      { key: 'title', label: tPost('title') },
      { key: 'author', label: tPost('author') },
      { key: 'commentCount', label: 'Comments' },
      { key: 'likeCount', label: 'Likes' },
      { key: 'status', label: tPost('status') },
      { key: 'createdAt', label: tCommon('createdAt') },
      { key: 'updatedAt', label: tCommon('updatedAt') },
    ],
    [tPost, tCommon],
  );

  const transformPostForExport = (post: IPost) => {
    const statusType = !post.status ? 'hidden' : 'visible';
    const statusLabel = STATUS_HIDDEN.find(item => item.value === statusType)?.labelKey ?? '';

    return {
      ...post,
      author: post.author?.name || '',
      status: t(statusLabel),
      commentCount: post.commentCount || 0,
      likeCount: post.likeCount || 0,
      createdAt: post.createdAt ? utils_DateToDDMMYYYY(post.createdAt) : '',
      updatedAt: post.updatedAt ? utils_DateToDDMMYYYY(post.updatedAt) : '',
    };
  };

  return (
    <DataExport
      values={data.map(transformPostForExport)}
      columns={columnsExport}
      fileName="posts.xlsx"
    />
  );
}
