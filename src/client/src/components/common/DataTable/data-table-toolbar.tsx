'use client';

import type { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  fieldFilter?: string;
}

export function DataTableToolbar<TData>({ table, fieldFilter }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder={`Search ${fieldFilter}`}
        value={(table.getColumn(fieldFilter ?? 'title')?.getFilterValue() as string) ?? ''}
        onChange={event => table.getColumn(fieldFilter ?? 'title')?.setFilterValue(event.target.value)}
        className="h-8 w-[150px] lg:w-[250px] rounded-md"
      />
    </div>
  );
}
