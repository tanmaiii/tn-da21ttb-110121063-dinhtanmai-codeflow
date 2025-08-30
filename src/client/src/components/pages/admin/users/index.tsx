'use client';

import ActionDelete from '@/components/common/Action/ActionDelete';
import DataExport from '@/components/common/DataTable/data-export';
import { DataTable } from '@/components/common/DataTable/data-table';
import MyBadge from '@/components/common/MyBadge';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import MySelect from '@/components/common/MySelect';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import { TextDescription } from '@/components/ui/text';
import { ROLE_USER } from '@/constants/object';
import useQ_User_GetAll from '@/hooks/query-hooks/User/useQ_User_GetAll';
import { useDebounce } from '@/hooks/useDebounce';
import { IUser } from '@/interfaces/user';
import userService from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Table } from '@tanstack/react-table';
import { GithubIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import UsersCreate from './UsersCreate';
import UsersUpdate from './UsersUpdate';

export default function Users() {
  const tCommon = useTranslations('common');
  const t = useTranslations();
  const tAdmin = useTranslations('admin');
  const queryClient = useQueryClient();
  const [role, setRole] = useState('all');
  const tUser = useTranslations('users');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const tableRef = useRef<Table<IUser> | null>(null);

  const { data, isLoading } = useQ_User_GetAll({
    params: {
      page,
      limit: limit,
      search: debouncedSearch,
      role: role !== 'all' ? role : undefined,
    },
  });

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        header: tUser('name'),
        accessorKey: 'name',
        cell: ({ row }) => (
          <MemberAvatar
            id={row.original.id}
            name={row.original.name || ''}
            avatar={row.original.avatar}
          />
        ),
      },
      {
        header: 'Username',
        accessorKey: 'username',
        cell: ({ row }) => {
          if (!row.original.uid) return row.original.username;

          return (
            <div className="flex items-center gap-1">
              <GithubIcon className="w-4 h-4" />
              <Link
                className="hover:underline"
                href={`https://github.com/${row.original.username}`}
                target="_blank"
              >
                <TextDescription className="text-color-1">{row.original.username}</TextDescription>
              </Link>
            </div>
          );
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
        header: tUser('role'),
        accessorKey: 'role',
        cell: ({ row }) => (
          <MyBadge status={ROLE_USER.find(item => item.value === (row.original.role ?? 'user'))!} />
        ),
      },
    ],
    [tUser],
  );

  const mutationDelete = useMutation({
    mutationFn: async (selectedRowsData: IUser[]) => {
      await Promise.all(
        selectedRowsData.map(item => {
          return userService.delete(item.id);
        }),
      );
    },
    onSuccess: () => {
      toast.success(tCommon('deleteSuccess'));
      queryClient.invalidateQueries({ queryKey: ['users'] });
      tableRef.current?.resetRowSelection();
    },
    onError: () => {
      toast.error(tCommon('deleteError'));
    },
  });

  const columnsExport = useMemo(
    () => [
      { key: 'name', label: tUser('name') },
      { key: 'username', label: tUser('username') },
      { key: 'email', label: tUser('email') },
      { key: 'role', label: tUser('role') },
    ],
    [tUser],
  );

  const customToolbar = ({ table }: { table: Table<IUser> }) => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

    return (
      <>
        <UsersCreate />
        {selectedRowsCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => mutationDelete.mutate(selectedRowsData)}
          >
            {`${tCommon('delete')} (${selectedRowsCount})`}
          </Button>
        )}
        <DataExport
          values={data?.data?.map(user => {
            return {
              ...user,
              role: t(
                ROLE_USER.find(roleItem => roleItem.value === (user.role ?? 'user'))?.labelKey ??
                  '',
              ),
            };
          })}
          columns={columnsExport}
          fileName={`user.xlsx`}
        />
      </>
    );
  };

  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      <TitleHeader title={tAdmin('users.title')} description={tAdmin('users.description')} />
      <DataTable
        isLoading={isLoading}
        showIndexColumn={true}
        columns={columns}
        data={data?.data || []}
        searchValue={search}
        onSearchChange={setSearch}
        enableLocalSearch={false}
        pagination={false}
        showSelectionColumn={true}
        toolbarCustom={customToolbar}
        onTableReady={table => (tableRef.current = table)}
        renderHeader={() => (
          <MySelect
            name="role"
            defaultValue={role}
            options={[
              { labelKey: 'common.all', value: 'all' },
              ...ROLE_USER.map(option => ({
                labelKey: option.labelKey,
                value: option.value.toString(),
              })),
            ]}
            onChange={value => {
              setPage(1);
              setRole(value);
            }}
            size="sm"
          />
        )}
        renderActions={({ row }) => (
          <>
            <UsersUpdate user={row.original} />
            <ActionDelete
              deleteKey={row.original.name}
              handleSubmit={async () => {
                await userService.delete(row.original.id);
              }}
            />
          </>
        )}
      />
      <div className="my-6">
        <MyPagination
          currentPage={data?.pagination.currentPage || 1}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={page => setPage(page)}
          limit={limit}
          onLimitChange={setLimit}
          totalItem={data?.pagination.totalItems || 0}
        />
      </div>
    </div>
  );
}
