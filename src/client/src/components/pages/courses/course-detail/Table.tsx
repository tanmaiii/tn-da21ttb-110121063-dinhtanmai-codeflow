'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import AvatarGroup from '@/components/common/AvatarGroup';
import { DataTable } from '@/components/common/DataTable/data-table';
import { DataTableColumnHeader } from '@/components/common/DataTable/data-table-column-header';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC, STATUS_TOPIC_CUSTOM } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ITopic } from '@/interfaces/topic';
import apiConfig from '@/lib/api';
import topicService from '@/services/topic.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Courses_Detail_Topics_Create from '../course-topics/Create';
import Courses_Detail_Topics_Update from '../course-topics/Update';
import { useUserStore } from '@/stores/user_store';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { Card } from '@/components/ui/card';
import TitleHeader from '@/components/layout/TitleHeader';

export default function CoursesDetailTopicsTable() {
  const t = useTranslations('topic');
  const tCommon = useTranslations('common');
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { user } = useUserStore();
  const params = useParams();
  const id = params?.id as string;
  const tCourse = useTranslations('course');
  const { data: course } = useQ_Course_GetDetail({ id: id });

  const { data: Q_Course } = useQ_Course_GetDetail({ id: course?.data?.id ?? '' });

  const { data: topicsData } = useQ_Topic_GetAllByCourseId({
    params: {
      page: page,
      limit: 10,
      courseId: course?.data?.id ?? '',
    },
    options: {
      enabled: !!course?.data?.id,
    }
  });

  const mutation = useMutation({
    mutationFn: async (selectedRowsData: ITopic[]) => {
      await Promise.all(selectedRowsData.map(item => topicService.delete(item.id)));
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['topics', 'course', course?.data?.id ?? ''] });
    },
    onError: () => {
      toast.error(t('deleteError'));
    },
  });

  const columns = useMemo<ColumnDef<ITopic>[]>(
    () => [
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('title')} />,
        accessorKey: 'title',
        cell: ({ row }) => (
          <Link href={`${paths.TOPICS_DETAIL(row.original.id)}`}>{row.original.title}</Link>
        ),
        size: 100,
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('description')} />,
        accessorKey: 'description',
        size: 200,
        cell: ({ row }) => (
          <TextDescription className="line-clamp-3">{row.original.description}</TextDescription>
        ),
      },
      {
        accessorKey: 'group',
        header: 'Group',
        size: 100,
        cell: ({ row }) => {
          return (
            <AvatarGroup
              avatars={
                row.original.members?.map(member => ({
                  url: member.user?.avatar
                    ? member.user?.avatar
                    : apiConfig.avatar(member.user?.name ?? 'c'),
                  name: member.user?.name ?? 'c',
                  alt: member.user?.name ?? 'c',
                })) ?? []
              }
              max={3}
            />
          );
        },
      },
      {
        accessorKey: 'isCustom',
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('isCustom')} />,
        size: 100,
        cell: ({ row }) => {
          const isCustom = row.original.isCustom;
          const statusType = isCustom ? 'custom' : 'suggest';
          return <MyBadge status={STATUS_TOPIC_CUSTOM.find(item => item.value === statusType)!} />;
        },
      },
      {
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('status')} />,
        accessorKey: 'status',
        size: 100,
        cell: ({ row }) => {
          const status = row.original.status;
          return <MyBadge status={STATUS_TOPIC.find(item => item.value === status)!} />;
        },
      },
    ],
    [t],
  );

  const customToolbar = ({ table }: { table: Table<ITopic> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      user?.id === Q_Course?.data.authorId && (
        <div className="flex items-center space-x-2">
          <Courses_Detail_Topics_Create courseId={course?.data?.id ?? ''} />
          {selectedRowsCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => mutation.mutate(selectedRowsData)}
            >
              {`${tCommon('delete')} (${selectedRowsCount})`}
            </Button>
          )}
        </div>
      )
    );
  };

  return (
    <div className="h-full">
      <Card className="p-2 lg:p-6 flex flex-col gap-4 min-h-[calc(100vh-100px)]">
        <TitleHeader title={course?.data?.title ?? ''} onBack={true} description={tCourse('topics')} />
        <DataTable
          className="min-h-[600px]"
          columns={columns}
          data={topicsData?.data || []}
          fieldFilter="title"
          pagination={false}
          showSelectionColumn={user?.id === Q_Course?.data.authorId}
          showIndexColumn={true}
          toolbarCustom={customToolbar}
          renderActions={({ row }) => (
            <div className="flex justify-center">
              <ActionIcon
                actionType={'view'}
                onClick={() => router.push(`${paths.TOPICS_DETAIL(row.original.id)}`)}
                type="button"
              />
              {user?.id === Q_Course?.data.authorId && (
                <div>
                  <Courses_Detail_Topics_Update topic={row.original} />
                  <ActionDelete
                    deleteKey={row.original.title}
                    handleSubmit={async () => {
                      await topicService.delete(row.original.id);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        />
        <MyPagination
          currentPage={topicsData?.pagination?.currentPage ?? 1}
          totalPages={topicsData?.pagination?.totalPages ?? 1}
          onPageChange={value => setPage(value)}
        />
      </Card>
    </div>
  );
}
