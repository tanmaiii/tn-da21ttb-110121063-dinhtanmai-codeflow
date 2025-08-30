import { Skeleton } from '@/components/ui/skeleton';

export default function TableSkeleton() {
  return (
    <div className="bg-background-1 dark:bg-background-3 rounded-lg p-4 min-h-[100vh]">
      {/* Table Header */}
      <div className="rounded-md border">
        <div className="flex items-center border-b px-4 py-3">
          <Skeleton className="h-4 w-[40px] mr-4" />
          <Skeleton className="h-4 w-[200px] mr-4" />
          <Skeleton className="h-4 w-[150px] mr-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>

        {/* Table Rows */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex items-center px-4 py-3 border-b last:border-0">
            <Skeleton className="h-4 w-[40px] mr-4" />
            <Skeleton className="h-4 w-[200px] mr-4" />
            <Skeleton className="h-4 w-[150px] mr-4" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="w-full flex items-center justify-center mt-4 space-x-2">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
    </div>
  );
}
