import MyImage from '@/components/common/MyImage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import useQ_Course_GetMembers from '@/hooks/query-hooks/Course/useQ_Course_GetMembers';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ICourse } from '@/interfaces/course';
import { useUserStore } from '@/stores/user_store';
import { utils_CalculateWeeks } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import {
  IconAward,
  IconBook,
  IconChartBar,
  IconChevronRight,
  IconClockHour1,
  IconTrendingUp,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Trang tóm tắt khóa học
export default function CoursesSummary({ course }: { course: ICourse }) {
  const router = useRouter();
  const { data: members } = useQ_Course_GetMembers({
    id: course.id,
    params: { page: 1, limit: 1000 },
  });
  const { data: topics } = useQ_Topic_GetAllByCourseId({
    params: { courseId: course.id, page: 1, limit: 1 },
  });
  const { user } = useUserStore();

  const t = useTranslations('course');

  const isOwner = user?.id === course.authorId;
  const weeksDuration = utils_CalculateWeeks(course?.startDate ?? '', course?.endDate ?? '');
  const studentsCount = members?.data?.length || 0;
  const topicsCount = topics?.pagination.totalItems || 0;
  const isExpired = new Date(course.endDate) < new Date();

  return (
    <div className="space-y-6">
      {/* Main Course Card */}
      <Card className="overflow-hidden p-0 border-0 shadow-lg bg-white dark:bg-gray-900">
        {/* Course Image with Overlay */}
        <div className="relative h-56 overflow-hidden">
          <MyImage
            src={
              course?.thumbnail
                ? utils_ApiImageToLocalImage(course.thumbnail)
                : IMAGES.DEFAULT_COURSE
            }
            alt={course.title}
            fill
            defaultSrc={IMAGES.DEFAULT_COURSE.src}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Course Badge */}
          <div className="absolute top-4 left-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-800 shadow-sm">
              <IconBook className="size-3 mr-1" />
              {t('course')}
            </div>
          </div>

          {/* Course Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-lg">
              {course.title}
            </h3>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800/50">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/80 border border-blue-200/50 dark:from-blue-900/30 dark:to-blue-800/20 dark:border-blue-700/30 hover:shadow-md transition-all duration-200">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-blue-500/10 dark:bg-blue-400/20 rounded-full">
                  <IconClockHour1 className="size-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <TextHeading className="text-sm justify-center font-semibold text-blue-900 dark:text-blue-100">
                {weeksDuration}
              </TextHeading>
              <TextDescription className="text-xs text-blue-700 dark:text-blue-300">
                {t('weeks')}
              </TextDescription>
            </div>

            <Link
              href={isOwner ? paths.COURSE_MEMBER(course.id) : ''}
              className="text-center p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/80 border border-emerald-200/50 dark:from-emerald-900/30 dark:to-emerald-800/20 dark:border-emerald-700/30 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 justify-center bg-emerald-500/10 dark:bg-emerald-400/20 rounded-full">
                  <IconUser className="size-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <TextHeading className="text-sm justify-center font-semibold text-emerald-900 dark:text-emerald-100">
                {studentsCount}
              </TextHeading>
              <TextDescription className="text-xs text-emerald-700 dark:text-emerald-300">
                {t('students')}
              </TextDescription>
            </Link>

            <Link
              href={isOwner ? paths.COURSE_TOPICS(course.id) : ''}
              className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/80 border border-purple-200/50 dark:from-purple-900/30 dark:to-purple-800/20 dark:border-purple-700/30 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2  bg-purple-500/10 dark:bg-purple-400/20 rounded-full">
                  <IconBook className="size-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <TextHeading className="text-sm justify-center font-semibold text-purple-900 dark:text-purple-100">
                {topicsCount}
              </TextHeading>
              <TextDescription className="text-xs text-purple-700 dark:text-purple-300">
                {t('topics')}
              </TextDescription>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isOwner && (
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                onClick={() => router.push(paths.COURSE_TOPICS(course.id))}
              >
                <IconTrendingUp className="size-4 mr-2" />
                {t('topics')}
                <IconChevronRight className="size-4 ml-auto" />
              </Button>
            )}

            {isOwner && (
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 dark:from-purple-500 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                onClick={() => router.push(paths.COURSE_DASHBOARD(course.id))}
              >
                <IconChartBar className="size-4 mr-2" />
                {'Dashboard'}
                <IconChevronRight className="size-4 ml-auto" />
              </Button>
            )}

            {isExpired ? (
              <div className="flex justify-center pt-4">
                <TextDescription className="text-sm text-red-700 text-center dark:text-red-300">
                  {t('courseExpired')}
                </TextDescription>
              </div>
            ) : (
              !isOwner && (
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-emerald-500 dark:to-emerald-600 dark:hover:from-emerald-600 dark:hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                  onClick={() => router.push(paths.COURSE_REGISTER(course.id))}
                >
                  <IconAward className="size-4 mr-2" />
                  {t('register')}
                  <IconChevronRight className="size-4 ml-auto" />
                </Button>
              )
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
