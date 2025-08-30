'use client';
import CardCourse from '@/components/common/CardCourse/CardCourse';
import { DashboardFullSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import { paths } from '@/data/path';
import { ICourse } from '@/interfaces/course';
import courseService from '@/services/course.service';
import { useUserStore } from '@/stores/user_store';
import {
  IconArrowRight,
  IconBook,
  IconClock,
  IconTarget,
  IconTrendingUp,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { EmptyState, QuickActions } from './components';
import useQ_Topic_GetAllByUserId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByUserId';
import StatCard from '@/components/common/StatCard';

interface DashboardStats {
  totalCourses: number;
  activeCourses: number;
  totalTopics: number;
  upcomingDeadlines: number;
}

export default function DashboardStudentView() {
  const router = useRouter();
  const { user } = useUserStore();
  const t = useTranslations('dashboard');

  // Fetch enrolled courses
  const { data: enrolledCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ['enrolled-courses'],
    queryFn: () => courseService.getAllRegistered({ page: 1, limit: 6 }),
    enabled: !!user,
  });

  const { data: topics } = useQ_Topic_GetAllByUserId({
    params: {
      userId: user?.id || '',
      page: 1,
      limit: 0,
    },
    options: {
      enabled: !!user?.id,
    },
  });

  // Mock statistics - in real app, this would come from API
  const stats: DashboardStats = {
    totalCourses: enrolledCourses?.data?.length || 0,
    activeCourses:
      enrolledCourses?.data?.filter((course: ICourse) => {
        const currentDate = new Date();
        const startDate = new Date(course.startDate);
        const endDate = new Date(course.endDate);
        return currentDate >= startDate && currentDate <= endDate;
      }).length || 0,
    totalTopics: topics?.pagination.totalItems ?? 0,
    upcomingDeadlines:
      enrolledCourses?.data?.filter((course: ICourse) => {
        const currentDate = new Date();
        const topicDeadline = new Date(course.topicDeadline);
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(currentDate.getDate() + 7);

        return (
          course.topicDeadline && topicDeadline > currentDate && topicDeadline <= sevenDaysFromNow
        );
      }).length || 0,
  };

  if (coursesLoading) {
    return <DashboardFullSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalCourses')}
          value={stats.totalCourses}
          icon={IconBook}
          description={t('enrolled')}
          color="default"
        />
        <StatCard
          title={t('activeCourses')}
          value={stats.activeCourses}
          icon={IconTrendingUp}
          description={t('currentCourses')}
          color="success"
        />
        <StatCard title={t('topics')} value={stats.totalTopics} icon={IconTarget} color="success" />
        <StatCard
          title={t('upcomingDeadlines')}
          value={stats.upcomingDeadlines}
          icon={IconClock}
          description={t('next7Days')}
          color="warning"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions variant="student" />

      {/* Enrolled Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{t('enrolledCourses')}</h3>
            <p className="text-muted-foreground">{t('continueJourney')}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push(paths.COURSES)}
            className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
          >
            {t('viewAll')}
            <IconArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {enrolledCourses?.data && enrolledCourses.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.data.slice(0, 3).map((course: ICourse) => (
              <CardCourse key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState variant="student" />
        )}
      </div>
    </div>
  );
}
