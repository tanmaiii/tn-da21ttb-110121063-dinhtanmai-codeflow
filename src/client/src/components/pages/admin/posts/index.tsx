'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import ActionIcon from '@/components/common/Action/ActionIcon';
import ActionStatus from '@/components/common/Action/ActionStatus';
import { DataTable } from '@/components/common/DataTable/data-table';
import MyBadge from '@/components/common/MyBadge';
import MyImage from '@/components/common/MyImage';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import { TextDescription } from '@/components/ui/text';
import { STATUS_HIDDEN } from '@/constants/object';
import { IMAGES } from '@/data/images';
import { Paths } from '@/data/path';
import useQ_Post_GetAll from '@/hooks/query-hooks/Post/useQ_Post_GetAll';
import { useDebounce } from '@/hooks/useDebounce';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { IPost } from '@/interfaces/post';
import postService from '@/services/post.service';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { IconHeart, IconMessage } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import PostsExport from './PostsExport';

export default function Posts() {
  const t = useTranslations('post');
  const tCommon = useTranslations('common');
  const tAdmin = useTranslations('admin');
  const { localPath } = useH_LocalPath();
  const router = useRouter();
  const queryClient = useQueryClient();
  const tableRef = useRef<Table<IPost> | null>(null);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const Q_Posts = useQ_Post_GetAll({
    params: {
      page: Number(page),
      limit: limit,
      sortBy: 'createdAt',
      order: 'DESC',
      search: debouncedSearch,
    },
  });

  const columns = useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        header: t('title'),
        accessorKey: 'title',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <MyImage
              src={
                row.original.thumbnail
                  ? utils_ApiImageToLocalImage(row.original.thumbnail)
                  : IMAGES.DEFAULT_POST
              }
              alt={row.original.title}
              width={100}
              height={100}
              className="rounded-sm"
              defaultSrc={IMAGES.DEFAULT_POST.src}
            />
            <div className="flex flex-col">
              <Link
                className="hover:underline"
                href={localPath(Paths.POST_DETAIL(row.original.id))}
              >
                {row.original.title}
              </Link>
              {row.original.deletedAt && (
                <span className="text-xs text-red-500 font-semibold">
                  {tCommon('softDeleted')} {utils_DateToDDMMYYYY(row.original.deletedAt!)}
                </span>
              )}
            </div>
          </div>
        ),
        size: 400,
      },
      {
        header: t('author'),
        accessorKey: 'author',
        cell: ({ row }) => (
          <MemberAvatar
            name={row.original.author?.name || ''}
            avatar={row.original.author?.avatar}
            description={row.original.author?.username}
          />
        ),
      },
      {
        header: t('info'),
        accessorKey: 'deletedAt',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1">
              <TextDescription className="flex items-center gap-1">
                <IconMessage size={14} />
                {row.original.commentCount}
              </TextDescription>
              <TextDescription className="flex items-center gap-1">
                <IconHeart size={14} />
                {row.original.likeCount}
              </TextDescription>
            </div>
          );
        },
      },
      {
        header: tCommon('createdAt'),
        accessorKey: 'createdAt',
        cell: ({ row }) => utils_DateToDDMMYYYY(row.original.createdAt!),
      },
      {
        header: t('status'),
        accessorKey: 'status',
        cell: ({ row }) => {
          const statusType = !row.original.status ? 'hidden' : 'visible';
          return <MyBadge status={STATUS_HIDDEN.find(item => item.value === statusType)!} />;
        },
      },
    ],
    [localPath, t, tCommon],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: IPost[]) => {
      await Promise.all(
        selectedRowsData.map(item => {
          if (item.deletedAt) return;
          return postService.delete(item.id);
        }),
      );
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      tableRef.current?.resetRowSelection();
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const mutationRestore = useMutation({
    mutationFn: async (id: string) => {
      await postService.restore(id);
    },
    onSuccess: () => {
      toast.success(tCommon('restoreSuccess'));
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      toast.error(tCommon('restoreError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<IPost> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <>
        <Button
          onClick={() => router.push(`/admin/${Paths.POST_CREATE}`)}
          variant="outline"
          size="sm"
          className="w-fit"
        >
          {tCommon('create')}
        </Button>

        {selectedRowsCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => mutationDelete.mutate(selectedRowsData)}
          >
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}

        <PostsExport data={Q_Posts.data?.data || []} />
      </>
    );
  };

  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      <TitleHeader title={tAdmin('posts.title')} description={tAdmin('posts.description')} />
      <DataTable
        isLoading={Q_Posts.isLoading}
        showIndexColumn={true}
        columns={columns}
        data={Q_Posts.data?.data || []}
        onTableReady={table => (tableRef.current = table)}
        onSearchChange={value => {
          setPage(1);
          setSearch(value);
        }}
        enableLocalSearch={false}
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={customToolbar}
        renderActions={({ row }) => (
          <div className="flex">
            <ActionStatus
              handleSubmit={async () =>
                await postService.updateStatus(row.original.id, !row.original.status)
              }
            />

            {row.original.deletedAt ? (
              <ActionIcon
                actionType="restore"
                onClick={() => mutationRestore.mutate(row.original.id)}
                disabled={mutationRestore.isPending}
                title={tCommon('restore')}
              />
            ) : (
              <ActionIcon
                actionType={'update'}
                onClick={() => router.push(`/admin/${Paths.POST_UPDATE(row.original.id)}`)}
                type="button"
              />
            )}
            <ActionDelete
              deleteKey={row.original.title}
              destroy={!!row.original.deletedAt}
              handleSubmit={async () => {
                if (!row.original.deletedAt) {
                  await postService.delete(row.original.id);
                } else {
                  await postService.destroy(row.original.id);
                }
              }}
            />
          </div>
        )}
      />
      <MyPagination
        currentPage={Q_Posts.data?.pagination.currentPage || 1}
        totalPages={Q_Posts.data?.pagination.totalPages || 1}
        onPageChange={page => setPage(page)}
        limit={limit}
        onLimitChange={setLimit}
        totalItem={Q_Posts.data?.pagination.totalItems || 0}
      />
    </div>
  );
}
