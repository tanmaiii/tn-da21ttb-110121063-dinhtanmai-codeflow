import { DataTable } from '@/components/common/DataTable/data-table';
import { DataTableColumnHeader } from '@/components/common/DataTable/data-table-column-header';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ITopic } from '@/interfaces/topic';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function CoursesTopics() {
  const t = useTranslations('topic');
  const tCourse = useTranslations('course');
  const [page, setPage] = useState(1);
  const params = useParams();

  const { data: topicsData } = useQ_Topic_GetAllByCourseId({
    params: {
      page: page,
      limit: 10,
      courseId: params?.id as string,
      isCustom: false,
    },
  });

  const columns = useMemo<ColumnDef<ITopic>[]>(
    () => [
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('title')} />,
        accessorKey: 'title',
        cell: ({ row }) => (
          <Link href={`${paths.TOPICS_DETAIL(row.original.id)}`}>
            <TextDescription className="line-clamp-2 font-normal text-color-1">
              {row.original.title}
            </TextDescription>
          </Link>
        ),
        size: 200,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('description')} />,
        accessorKey: 'description',
        size: 200,
        cell: ({ row }) => (
          <TextDescription className="line-clamp-3">{row.original.description}</TextDescription>
        ),
      },
      // {
      //   accessorKey: 'group',
      //   header: 'Group',
      //   size: 100,
      //   cell: ({ row }) => {
      //     return (
      //       <AvatarGroup
      //         avatars={
      //           row.original.members?.map(member => ({
      //             url: member.user?.avatar
      //               ? member.user?.avatar
      //               : apiConfig.avatar(member.user?.name ?? 'c'),
      //             name: member.user?.name ?? 'c',
      //             alt: member.user?.name ?? 'c',
      //           })) ?? []
      //         }
      //         max={3}
      //       />
      //     );
      //   },
      // },
      {
        accessorKey: 'trangthai',
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('status')} />,
        size: 100,
        cell: ({ row }) => {
          if (row.original.members && row.original.members?.length > 0) {
            return <TextDescription>{t('registered')}</TextDescription>;
          }
          return <TextDescription>{t('notRegistered')}</TextDescription>;
        },
      },
      //   {
      //     accessorKey: 'isCustom',
      //     header: ({ column }) => <DataTableColumnHeader column={column} title={t('isCustom')} />,
      //     size: 100,
      //     cell: ({ row }) => {
      //       const isCustom = row.original.isCustom;
      //       const statusType = isCustom ? 'custom' : 'suggest';
      //       return <MyBadge status={STATUS_TOPIC_CUSTOM.find(item => item.value === statusType)!} />;
      //     },
      //   },
      //   {
      //     header: ({ column }) => <DataTableColumnHeader column={column} title={t('status')} />,
      //     accessorKey: 'status',
      //     size: 100,
      //     cell: ({ row }) => {
      //       const status = row.original.status;
      //       return <MyBadge status={STATUS_TOPIC.find(item => item.value === status)!} />;
      //     },
      //   },
    ],
    [t],
  );

  return (
    <div className="h-full mt-2 ">
      <TextHeading className="mb-4">{tCourse('suggestedTopics')}</TextHeading>
      <DataTable
        columns={columns}
        data={topicsData?.data || []}
        pagination={false}
        showIndexColumn={true}
      />
      <MyPagination
        currentPage={topicsData?.pagination?.currentPage ?? 1}
        totalPages={topicsData?.pagination?.totalPages ?? 1}
        onPageChange={value => setPage(value)}
      />
    </div>
  );
}
