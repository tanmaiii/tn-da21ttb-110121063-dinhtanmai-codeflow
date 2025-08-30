'use client';
import ActionDelete from '@/components/common/Action/ActionDelete';
import { DataTable } from '@/components/common/DataTable/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import { TextDescription } from '@/components/ui/text';
import { ROLE_USER } from '@/constants/object';
import useQ_Course_GetMembers from '@/hooks/query-hooks/Course/useQ_Course_GetMembers';
import { IUser } from '@/interfaces/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useMemo, useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import CoureseMemberCreate from './CoureseMemberCreate';
import courseService from '@/services/course.service';
import { useUserStore } from '@/stores/user_store';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';

export default function CoursesMember() {
  const tCommon = useTranslations('common');
  const tCourse = useTranslations('course');
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id as string;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const tableRef = useRef<Table<IUser> | null>(null);
  const { user } = useUserStore();
  const { data: course } = useQ_Course_GetDetail({ id: params?.id as string });

  const { data } = useQ_Course_GetMembers({
    id: id,
    params: { page: Number(page), limit: 10, search: search },
  });

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        header: 'Name',
        // accessorKey: 'name',
        cell: ({ row }) => (
          <MemberAvatar
            avatar={row.original.avatar ?? ''}
            id={row.original.id}
            name={row.original.name ?? ''}
          />
        ),
      },
      {
        header: 'Username',
        accessorKey: 'username',
        cell: ({ row }) => {
          if (row.original.uid) {
            return (
              <Link
                className="hover:underline"
                href={`https://github.com/${row.original.username}`}
                target="_blank"
              >
                <TextDescription className="text-color-1">{row.original.username}</TextDescription>
              </Link>
            );
          }
          return row.original.username;
        },
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: ({ row }) => (
          <TextDescription className="text-color-1">{row.original.email}</TextDescription>
        ),
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: ({ row }) => {
          return (
            <MyBadge
              status={ROLE_USER.find(item => item.value === (row.original.role ?? 'user'))!}
            />
          );
        },
      },
    ],
    [data],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: IUser[]) => {
      await Promise.all(selectedRowsData.map(item => courseService.removeMember(id, item.id)));
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['courses', 'members', id] });
      // Reset row selection after successful deletion
      if (tableRef.current) {
        tableRef.current.resetRowSelection();
      }
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const customToolbar = ({ table }: { table: Table<IUser> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <div className="flex justify-center items-center gap-2">
        <CoureseMemberCreate />
        {selectedRowsCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => mutationDelete.mutate(selectedRowsData)}
          >
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!user || !course?.data) return;
    if (user?.id !== course?.data?.authorId) return notFound();
  }, [user, course]);

  return (
    <Card className="p-2 lg:p-6 flex flex-col gap-4 min-h-[calc(100vh-100px)]">
      <TitleHeader title={tCourse('member')} description={course?.data?.title} onBack />
      <div className="min-h-[60vh]">
        <DataTable
          // fieldFilter="name"
          showIndexColumn={true}
          showSelectionColumn={true}
          onSearchChange={value => {
            setSearch(value);
          }}
          pagination={false}
          columns={columns}
          data={data?.data || []}
          toolbarCustom={customToolbar}
          onTableReady={table => {
            tableRef.current = table;
          }}
          renderActions={({ row }) => (
            <>
              <ActionDelete
                deleteKey={row.original.name}
                handleSubmit={async () => {
                  await courseService.removeMember(id, row.original.id);
                }}
              />
            </>
          )}
        />
      </div>
      <div className="my-6">
        <MyPagination
          currentPage={data?.pagination.currentPage || 1}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={page => setPage(page)}
        />
      </div>
    </Card>
  );
}
