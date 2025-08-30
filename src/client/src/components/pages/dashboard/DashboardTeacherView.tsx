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
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { EmptyState, QuickActions, TeachingAnalytics } from './components';
import topicService from '@/services/topic.service';
import { ENUM_STATUS_TOPIC } from '@/constants/enum';
import { useEffect, useState } from 'react';
import StatCard from '@/components/common/StatCard';

interface TeacherdashboardStats {
  totalCourses: number;
  totalStudents: number;
  pendingTopics: number;
  activeCourses: number;
}

export default function DashboardTeacherView() {
  const router = useRouter();
  const { user } = useUserStore();
  const t = useTranslations('dashboard');
  const [totalPendingTopics, setTotalPendingTopics] = useState(0);

  // Fetch teacher's courses
  const { data: teacherCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ['teacher-courses', user?.id],
    queryFn: () => courseService.getAllByUser(user?.id || '', { page: 1, limit: 6 }),
    enabled: !!user?.id,
  });

  // Calculate statistics
  const stats: TeacherdashboardStats = {
    totalCourses: teacherCourses?.data?.length || 0,
    totalStudents:
      teacherCourses?.data?.reduce(
        (sum: number, course: ICourse & { enrollmentCount?: number }) =>
          sum + (course.enrollmentCount || 0),
        0,
      ) || 0,
    pendingTopics: totalPendingTopics,
    activeCourses: teacherCourses?.data?.filter((course: ICourse) => course.status).length || 0,
  };

  const mutationTopic = useMutation({
    mutationFn: (courseId: string) =>
      topicService.getAllByCourseId(
        {
          page: 1,
          limit: 0,
          status: ENUM_STATUS_TOPIC.PENDING,
        },
        courseId,
      ),
    onSuccess: data => {
      setTotalPendingTopics(prev => prev + data.pagination.totalItems);
    },
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (teacherCourses?.data) {
      teacherCourses.data.forEach(course => {
        mutationTopic.mutate(course.id);
      });
    }
  }, [teacherCourses?.data]);

  if (coursesLoading) {
    return <DashboardFullSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('courses')}
          value={stats.totalCourses}
          icon={IconBook}
          description={t('created')}
          color="default"
          onClick={() => router.push(paths.COURSES)}
        />
        <StatCard
          title={t('students')}
          value={stats.totalStudents}
          icon={IconUsers}
          description={t('totalRegistrations')}
          color="success"
        />
        <StatCard
          title={t('pendingTopics')}
          value={stats.pendingTopics}
          icon={IconClock}
          description={t('needReview')}
          color="warning"
        />
        <StatCard
          title={t('activeCoursesFull')}
          value={stats.activeCourses}
          icon={IconTrendingUp}
          description={t('inProgress')}
          color="success"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions variant="teacher" />

      {/* Teacher's Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{t('myCourses')}</h3>
            <p className="text-muted-foreground">{t('manageTrackCourses')}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push(paths.COURSES)}
            className="hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
          >
            {t('viewAll')}
            <IconArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {teacherCourses?.data && teacherCourses.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherCourses.data.slice(0, 3).map((course: ICourse) => (
              <CardCourse key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState variant="teacher" />
        )}
      </div>

      {/* Teaching Analytics */}
      <TeachingAnalytics
        stats={{
          totalStudents: stats.totalStudents,
          activeCourses: stats.activeCourses,
          pendingTopics: stats.pendingTopics,
        }}
      />
    </div>
  );
}
