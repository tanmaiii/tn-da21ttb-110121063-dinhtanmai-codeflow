'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import ActionStatus from '@/components/common/Action/ActionStatus';
import { DataTable } from '@/components/common/DataTable/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import { STATUS_HIDDEN } from '@/constants/object';
import useQ_Comments_GetAll from '@/hooks/query-hooks/Comments/useQ_Comments_GetAll';
import { useDebounce } from '@/hooks/useDebounce';
import { ICommentSimple } from '@/interfaces/comment';
import commentService from '@/services/comment.service';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import CommentsExport from './CommentsExport';

export default function Comments() {
  const tCommon = useTranslations('common');
  const t = useTranslations('comment');
  const queryClient = useQueryClient();
  const tAdmin = useTranslations('admin');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const tableRef = useRef<Table<ICommentSimple> | null>(null);

  const { data: Q_Comments, isLoading } = useQ_Comments_GetAll({
    params: {
      page: Number(page),
      limit: limit,
      search: debouncedSearch,
    },
  });

  const columns = useMemo<ColumnDef<ICommentSimple>[]>(
    () => [
      {
        header: 'Content',
        accessorKey: 'content',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              {row.original.content}
              {row.original.deletedAt && (
                <span className="text-xs text-red-500 font-semibold">
                  {tCommon('softDeleted')} {utils_DateToDDMMYYYY(row.original.deletedAt!)}
                </span>
              )}
            </div>
          );
        },
        size: 400,
      },
      {
        header: 'Author',
        accessorKey: 'author',
        cell: ({ row }) => {
          return (
            <MemberAvatar
              name={row.original.author?.name || ''}
              avatar={row.original.author?.avatar}
            />
          );
        },
      },
      {
        header: t('status'),
        accessorKey: 'status',
        cell: ({ row }) => {
          const statusType = !row.original.status ? 'hidden' : 'visible';
          return <MyBadge status={STATUS_HIDDEN.find(item => item.value === statusType)!} />;
        },
      },
      {
        header: tCommon('createdAt'),
        accessorKey: 'createdAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.createdAt!),
        size: 100,
      },
      {
        header: tCommon('updatedAt'),
        accessorKey: 'updatedAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.updatedAt!),
        size: 100,
      },
    ],
    [t, tCommon],
  );

  const mutationRestore = useMutation({
    mutationFn: async (id: string) => {
      await commentService.restore(id);
    },
    onSuccess: () => {
      toast.success(tCommon('restoreSuccess'));
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: () => {
      toast.error(tCommon('restoreError'));
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: ICommentSimple[]) => {
      await Promise.all(
        selectedRowsData.map(item => {
          if (item.deletedAt) return;
          return commentService.delete(item.id);
        }),
      );
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      tableRef.current?.resetRowSelection();
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<ICommentSimple> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <div className="flex">
        {selectedRowsCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => mutationDelete.mutate(selectedRowsData)}
          >
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
        <CommentsExport data={Q_Comments?.data || []} />
      </div>
    );
  };

  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      <TitleHeader title={tAdmin('comments.title')} description={tAdmin('comments.description')} />
      <DataTable
        isLoading={isLoading}
        showSelectionColumn={true}
        showIndexColumn={true}
        onTableReady={table => (tableRef.current = table)}
        columns={columns}
        onSearchChange={value => {
          setPage(1);
          setSearch(value);
        }}
        toolbarCustom={customToolbar}
        data={Q_Comments?.data || []}
        pagination={false}
        renderActions={({ row }) => (
          <div className="flex">
            <ActionStatus
              handleSubmit={async () =>
                await commentService.updateStatus(row.original.id, !row.original.status)
              }
            />
            {row.original.deletedAt && (
              <ActionIcon
                actionType="restore"
                onClick={() => mutationRestore.mutate(row.original.id)}
                disabled={mutationRestore.isPending}
                title={tCommon('restore')}
              />
            )}
            <ActionDelete
              deleteKey={row.original.content}
              destroy={!!row.original.deletedAt}
              handleSubmit={async () => {
                if (!row.original.deletedAt) {
                  await commentService.delete(row.original.id);
                } else {
                  await commentService.destroy(row.original.id);
                }
              }}
            />
          </div>
        )}
      />
      <div className="my-6">
        <MyPagination
          currentPage={Q_Comments?.pagination.currentPage || 1}
          totalPages={Q_Comments?.pagination.totalPages || 1}
          onPageChange={page => setPage(page)}
          limit={limit}
          onLimitChange={setLimit}
          totalItem={Q_Comments?.pagination.totalItems || 0}
        />
      </div>
    </div>
  );
}
