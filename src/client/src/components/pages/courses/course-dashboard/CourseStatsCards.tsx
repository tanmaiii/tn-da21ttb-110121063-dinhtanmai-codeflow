import StatCard from '@/components/common/StatCard';
import useQ_Course_GetMembers from '@/hooks/query-hooks/Course/useQ_Course_GetMembers';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ICourse } from '@/interfaces/course';
import { util_format_number_compact } from '@/utils/common';
import { Award, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CourseStatsCards({
  course,
  isLoading = false,
}: {
  course?: ICourse;
  isLoading?: boolean;
}) {
  const t = useTranslations('dashboard.stats');

  const { data: members } = useQ_Course_GetMembers({
    id: course?.id ?? '',
    params: { page: 1, limit: -1 },
    options: {
      enabled: !!course?.id,
    },
  });

  const { data: topics } = useQ_Topic_GetAllByCourseId({
    params: {
      page: 1,
      limit: 0,
      courseId: course?.id ?? '',
    },
    options: {
      enabled: !!course?.id,
    },
  });

  const getProgessCourse = (deadline?: string, startDate?: string) => {
    if (!deadline || !startDate) return 0;
    const progress = Math.round(
      ((new Date().getTime() - new Date(startDate).getTime()) /
        (new Date(course?.topicDeadline ?? '').getTime() - new Date(course?.regStartDate ?? '').getTime())) *
        100,
    );
    return Math.min(progress, 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title={t('totalStudents')}
        value={util_format_number_compact(members?.pagination?.totalItems ?? 0)}
        icon={Users}
        description={t('enrolledDescription')}
        color="default"
        isLoading={isLoading}
      />
      <StatCard
        title={t('activeStudents')}
        value={members?.data?.filter(item => item?.topicMembers.length > 0).length ?? 0}
        icon={GraduationCap}
        description={t('activeDescription')}
        color="success"
        progress={
          members?.data && members?.pagination?.totalItems
            ? (members.data.filter(item => item?.topicMembers.length > 0).length /
                members.pagination.totalItems) *
              100
            : 0
        }
        isLoading={isLoading}
      />
      <StatCard
        title={t('completionProgress')}
        value={`${getProgessCourse(course?.topicDeadline, course?.regStartDate)}%`}
        icon={TrendingUp}
        description={t('progressDescription')}
        color="warning"
        progress={getProgessCourse(course?.topicDeadline, course?.regStartDate)}
        isLoading={isLoading}
      />
      <StatCard
        title={t('totalTopics')}
        value={util_format_number_compact(topics?.pagination?.totalItems ?? 0)}
        icon={Award}
        description={t('topicsDescription')}
        color="success"
        isLoading={isLoading}
      />
    </div>
  );
}
