'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  Table as TableInstance,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import TableSkeleton from '@/components/skeletons/TableSkeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { DataTablePagination } from './data-table-pagination';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fieldFilter?: string;
  pagination?: boolean;
  toolbarCustom?: ((props: { table: TableInstance<TData> }) => React.ReactNode) | React.ReactNode;
  renderHeader?: ((props: { table: TableInstance<TData> }) => React.ReactNode) | React.ReactNode;
  renderActions?: (props: { row: Row<TData> }) => React.ReactNode;
  showIndexColumn?: boolean;
  showSelectionColumn?: boolean;
  onPageChange?: (page: number) => void;
  appendToUrl?: boolean;
  className?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  enableLocalSearch?: boolean;
  isLoading?: boolean;
  onTableReady?: (table: TableInstance<TData>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fieldFilter = 'title',
  pagination = true,
  toolbarCustom,
  renderActions,
  renderHeader,
  showIndexColumn = false,
  showSelectionColumn = false,
  onPageChange,
  appendToUrl = false,
  className,
  onSearchChange,
  isLoading = false,
  onTableReady,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const tTable = useTranslations('table');


  const handleSearchChange = (value: string) => {
    onSearchChange?.(value);
  };

  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: showSelectionColumn,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: {
        pageSize: pagination ? 10 : data.length || 1000,
      },
    },
  });

  // Call onTableReady callback when table is ready
  React.useEffect(() => {
    if (onTableReady) {
      onTableReady(table);
    }
  }, [table, onTableReady]);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Input
            placeholder={`Search ${fieldFilter}`}
            onChange={event => handleSearchChange(event.target.value)}
            className="h-8 w-full sm:w-[150px] lg:w-[250px] rounded-md"
          />
          {/* {fieldFilter && <DataTableToolbar fieldFilter={fieldFilter} table={table} />} */}
          <div className="flex flex-wrap items-center gap-2">
            {toolbarCustom &&
              (typeof toolbarCustom === 'function' ? toolbarCustom({ table }) : toolbarCustom)}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {renderHeader &&
            (typeof renderHeader === 'function' ? renderHeader({ table }) : renderHeader)}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {showSelectionColumn && (
                    <TableHead className="w-[30px]">
                      <Checkbox
                        checked={
                          table.getIsAllPageRowsSelected() ||
                          (table.getIsSomePageRowsSelected() && 'indeterminate')
                        }
                        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                      />
                    </TableHead>
                  )}
                  {showIndexColumn && <TableHead className="w-[20px] text-center">STT</TableHead>}
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id} style={{ width: header.column.getSize() }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                  {renderActions && <TableHead className="text-center w-[80px]">Actions</TableHead>}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="h-full">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {showSelectionColumn && (
                      <TableCell className="w-[30px]">
                        <Checkbox
                          checked={row.getIsSelected()}
                          onCheckedChange={value => row.toggleSelected(!!value)}
                          aria-label="Select row"
                          className="translate-y-[2px]"
                        />
                      </TableCell>
                    )}
                    {showIndexColumn && (
                      <TableCell className="text-center w-[20px]">
                        {pagination
                          ? table.getState().pagination.pageIndex *
                              table.getState().pagination.pageSize +
                            rowIndex +
                            1
                          : rowIndex + 1}
                      </TableCell>
                    )}
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    {renderActions && (
                      <TableCell className="p-2 text-center w-[80px]">
                        {renderActions({ row })}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      (showSelectionColumn ? 1 : 0) +
                      (showIndexColumn ? 1 : 0) +
                      (renderActions ? columns.length + 1 : columns.length)
                    }
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {pagination && (
        <DataTablePagination table={table} onPageChange={onPageChange} appendToUrl={appendToUrl} />
      )}
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>
            {tTable('selectedRows', {
              length: table.getFilteredSelectedRowModel().rows.length,
              total: table.getFilteredRowModel().rows.length,
            })}
          </span>
        </div>
      )}
    </div>
  );
}
