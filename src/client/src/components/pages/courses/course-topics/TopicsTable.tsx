'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/DataTable/data-table';
import { DataTableColumnHeader } from '@/components/common/DataTable/data-table-column-header';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TextDescription } from '@/components/ui/text';
import { STATUS_TOPIC, STATUS_TOPIC_CUSTOM } from '@/constants/object';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ITopic } from '@/interfaces/topic';
import apiConfig from '@/lib/api';
import topicService from '@/services/topic.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ActionIcon from '@/components/common/Action/ActionIcon';
import AvatarGroup from '@/components/common/AvatarGroup';
import DataExport from '@/components/common/DataTable/data-export';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import MySelect from '@/components/common/MySelect';
import { paths } from '@/data/path';
import { useUserStore } from '@/stores/user_store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CourseTopicsCreate from './Create';
import CourseTopicsUpdate from './Update';

export default function TopicsTable() {
  const params = useParams();
  const courseId = params?.id as string;
  const { data: course } = useQ_Course_GetDetail({ id: courseId });
  const t = useTranslations('topic');
  const tCommon = useTranslations('common');
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState('all');
  const [isCustom, setIsCustom] = useState('all');
  const router = useRouter();
  const { user } = useUserStore();

  const { data: topicsData } = useQ_Topic_GetAllByCourseId({
    params: {
      page: page,
      limit: limit,
      courseId: courseId,
      status: status === 'all' ? '' : status,
      isCustom: isCustom === 'all' ? undefined : isCustom === 'custom' ? true : false,
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
      {
        accessorKey: 'group',
        header: t('members'),
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

  const columnsExport = useMemo(
    () => [
      { key: 'title', label: t('title') },
      { key: 'description', label: t('description') },
      { key: 'group', label: t('members') },
      { key: 'isCustom', label: t('isCustom') },
      { key: 'status', label: t('status') },
    ],
    [t],
  );

  const exportedValues = useMemo(() => {
    return topicsData?.data?.map(item => ({
      ...item,
      group: item.members?.map(member => member.user?.name).join(', '),
    }));
  }, [topicsData?.data]);

  const handleDeleteSingle = async (id: string) => {
    try {
      await topicService.delete(id);
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['topics', 'course', courseId] });
    } catch {
      toast.error(tCommon('deleteError'));
    }
  };

  const mutation = useMutation({
    mutationFn: async (selectedRowsData: ITopic[]) => {
      await Promise.all(selectedRowsData.map(item => topicService.delete(item.id)));
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['topics', 'course', params?.id as string] });
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<ITopic> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <div className="flex items-center space-x-2">
        <CourseTopicsCreate courseId={courseId} />
        {selectedRowsCount > 0 && (
          <Button variant="destructive" size="sm" onClick={() => mutation.mutate(selectedRowsData)}>
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
        <DataExport
          values={exportedValues}
          columns={columnsExport}
          fileName={`${course?.data?.title}-topics.xlsx`}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <MySelect
          options={[{ value: 'all', labelKey: 'common.all' }, ...STATUS_TOPIC_CUSTOM]}
          size="sm"
          name="selectedTimeframe"
          className="min-w-[120px]"
          defaultValue={isCustom}
          onChange={value => setIsCustom(value)}
        />
        <MySelect
          options={[{ value: 'all', labelKey: 'common.all' }, ...STATUS_TOPIC]}
          size="sm"
          name="selectedTimeframe"
          className="min-w-[120px]"
          defaultValue={status}
          onChange={value => setStatus(value)}
        />
      </>
    );
  };

  useEffect(() => {
    if (!user || !course?.data) return;
    if (user?.id !== course?.data?.authorId) return notFound();
  }, [user, course]);

  return (
    <Card className="p-6 flex flex-col gap-4 min-h-[calc(100vh-100px)]">
      <TitleHeader title={course?.data?.title ?? ''} onBack={true} description={t('topic')} />
      <DataTable
        className="min-h-[600px]"
        columns={columns}
        data={topicsData?.data || []}
        fieldFilter="title"
        pagination={false}
        showSelectionColumn={true}
        showIndexColumn={true}
        toolbarCustom={customToolbar}
        renderHeader={renderHeader}
        renderActions={({ row }) => (
          <div className="flex justify-center">
            <ActionIcon
              actionType={'view'}
              onClick={() => router.push(`${paths.TOPICS_DETAIL(row.original.id)}`)}
              type="button"
            />
            <CourseTopicsUpdate topic={row.original} />
            <ActionDelete
              deleteKey={row.original.title}
              handleSubmit={async () => {
                await handleDeleteSingle(row.original.id);
              }}
            />
          </div>
        )}
      />
      <div className="flex justify-center">
        <MyPagination
          totalItem={topicsData?.pagination?.totalItems ?? 0}
          currentPage={topicsData?.pagination?.currentPage ?? 1}
          totalPages={topicsData?.pagination?.totalPages ?? 1}
          onPageChange={value => setPage(value)}
          limit={10}
          onLimitChange={value => setLimit(value)}
        />
      </div>
    </Card>
  );
}
