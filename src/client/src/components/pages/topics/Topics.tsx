'use client';
import CardTopic from '@/components/common/CardTopic';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import NoData from '@/components/common/NoData/NoData';
import { TopicListSkeleton } from '@/components/skeletons/topic';
import TextHeading from '@/components/ui/text';
import { ROLE } from '@/constants/enum';
import { paths } from '@/data/path';
import useQ_Topic_GetAllByTeacherId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByTeacherId';
import useQ_Topic_GetAllByUserId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByUserId';
import { ITopic } from '@/interfaces/topic';
import { useUserStore } from '@/stores/user_store';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

// Constants
const TABS = [
  { id: 'all', label: 'all' },
  { id: 'approved', label: 'approved' },
  { id: 'pending', label: 'pending' },
  { id: 'rejected', label: 'rejected' },
] as const;

const ITEMS_PER_PAGE = 12;

type TabId = (typeof TABS)[number]['id'];

// Custom hook for topic data
const useTopicData = (tab: TabId, userId: string, userRole: string) => {
  const isTeacher = userRole === ROLE.TEACHER;
  const status = tab !== 'all' ? tab : '';

  const userTopicsQuery = useQ_Topic_GetAllByUserId({
    params: {
      page: 1,
      limit: ITEMS_PER_PAGE,
      userId,
      status,
    },
    options: {
      enabled: !isTeacher,
    },
  });

  const teacherTopicsQuery = useQ_Topic_GetAllByTeacherId({
    params: {
      page: 1,
      limit: ITEMS_PER_PAGE,
      status,
    },
    userId,
    options: {
      enabled: isTeacher,
    },
  });

  return {
    data: isTeacher ? teacherTopicsQuery.data : userTopicsQuery.data,
    isLoading: isTeacher ? teacherTopicsQuery.isLoading : userTopicsQuery.isLoading,
    isError: isTeacher ? teacherTopicsQuery.isError : userTopicsQuery.isError,
  };
};


export default function Topics() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('topic');
  const { user } = useUserStore();

  // Extract query parameters
  const currentPage = Number(searchParams?.get('page')) || 1;
  const currentTab = (searchParams?.get('tab') as TabId) || 'all';

  // Get topic data based on user role
  const {
    data: topicData,
    isLoading,
    isError,
  } = useTopicData(currentTab, user?.id || '', user?.role || '');

  // Navigation handlers
  const handleTabChange = (tabId: TabId) => {
    router.push(`${paths.TOPICS}?page=1&tab=${tabId}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`${paths.TOPICS}?page=${page}&tab=${currentTab}`);
  };

  // Early return for error state
  if (isError) {
    return <div>Error loading topics</div>;
  }

  const topics = topicData?.data || [];
  const totalPages = topicData?.pagination?.totalPages || 1;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Tab Navigation */}
      <div className="border-b py-2 flex items-center justify-between flex-row gap-4">
        <div className="flex items-center gap-2">
          {TABS.map(({ id, label }) => (
            <div
              key={id}
              onClick={() => handleTabChange(id)}
              className={`flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md ${
                currentTab === id ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <TextHeading>{t(label)}</TextHeading>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        {isLoading && <TopicListSkeleton />}
        {!isLoading && topics.length === 0 && <NoData />}
        {!isLoading && topics.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:gap-4 xl:gap-6 md:grid-cols-3 xl:grid-cols-4 py-2 mt-6">
            {topics?.map((topic: ITopic) => (
              <CardTopic key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && topics.length > 0 && (
        <div className="my-6">
          <MyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
