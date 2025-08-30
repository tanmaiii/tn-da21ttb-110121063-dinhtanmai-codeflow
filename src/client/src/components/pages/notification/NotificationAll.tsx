import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import NotificationItem from '@/components/common/NotificationItem';
import useQ_Notification_GetAllByUser from '@/hooks/query-hooks/Notification/useQ_Notification_GetAllByUser';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NotificationAll() {
  const [page, setPage] = useState(1);
  const t = useTranslations('notification');
  const {
    data: allData,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useQ_Notification_GetAllByUser({
    params: {
      page,
      limit: 9,
    },
  });

  if (isLoadingAll) return <div>Loading...</div>;
  if (errorAll) return <div>Error: {errorAll.message}</div>;

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-2 min-h-[600px]">
        {allData?.data.length && allData?.data.length > 0 ? (
          allData?.data.map((notification, index) => (
            <NotificationItem key={index} item={notification} />
          ))
        ) : (
          <div className="flex flex-col gap-2 h-full">
            <p className="text-center text-muted-foreground">{t('noNotifications')}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-auto">
        {allData?.pagination?.totalPages && allData?.pagination?.totalPages > 1 ? (
          <MyPagination
            currentPage={page}
            totalPages={allData?.pagination?.totalPages || 0}
            onPageChange={setPage}
          />
        ) : null}
      </div>
    </div>
  );
}
