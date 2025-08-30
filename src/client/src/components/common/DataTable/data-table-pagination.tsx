'use client'

import { type Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
  onPageChange?: (page: number) => void
  appendToUrl?: boolean
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  onPageChange,
  appendToUrl = false,
}: DataTablePaginationProps<TData>) {
  const [pageInputValue, setPageInputValue] = useState<string>(
    (table.getState().pagination.pageIndex + 1).toString()
  )
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value)
  }

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(pageInputValue, 10)
      if (!isNaN(page) && page > 0 && page <= table.getPageCount()) {
        table.setPageIndex(page - 1)
        handlePageNavigation(page)
      } else {
        setPageInputValue((table.getState().pagination.pageIndex + 1).toString())
      }
    }
  }

  // Update page input value when table page changes
  useEffect(() => {
    setPageInputValue((table.getState().pagination.pageIndex + 1).toString())
  }, [table])

  const handlePageChange = (newPageIndex: number) => {
    table.setPageIndex(newPageIndex)
    handlePageNavigation(newPageIndex + 1)
  }

  const handlePageNavigation = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    }
    
    if (appendToUrl) {
      const params = new URLSearchParams(searchParams?.toString() || '')
      params.set("page", page.toString())
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <span>
            Đã chọn {table.getFilteredSelectedRowModel().rows.length} trên{" "}
            {table.getFilteredRowModel().rows.length} hàng
          </span>
        ) : (
          <span>
            Hiển thị {table.getRowModel().rows.length} trên {table.getFilteredRowModel().rows.length} hàng
          </span>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Số hàng mỗi trang</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              handlePageNavigation(table.getState().pagination.pageIndex + 1)
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">Đến trang</p>
          <Input
            className="h-8 w-16"
            value={pageInputValue}
            onChange={handlePageInputChange}
            onKeyDown={handlePageInputKeyDown}
          />
          <span className="text-sm text-muted-foreground">
            / {table.getPageCount()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Đi đến trang đầu</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage()
              handlePageNavigation(table.getState().pagination.pageIndex)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Đi đến trang trước</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage()
              handlePageNavigation(table.getState().pagination.pageIndex + 2)
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Đi đến trang tiếp</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Đi đến trang cuối</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}