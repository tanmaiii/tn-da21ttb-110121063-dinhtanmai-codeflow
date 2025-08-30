import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import { ICourse } from '@/interfaces/course';
import { util_remove_html_tags } from '@/utils/common';
import {
  IconBookmark,
  IconChalkboard,
  IconChevronRight,
  IconTarget,
  IconUsers,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  course: ICourse;
  variant?: 'student' | 'teacher';
  gradientColor?: string;
}

export default function CourseCard({
  course,
  variant = 'student',
  gradientColor = 'from-blue-500 to-indigo-500',
}: CourseCardProps) {
  const router = useRouter();
  const t = useTranslations('dashboard');

  const hoverColor =
    variant === 'teacher' ? 'group-hover:text-indigo-600' : 'group-hover:text-blue-600';

  return (
    <Card
      className="group p-0 cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      onClick={() => router.push(paths.COURSES_DETAIL(course.id))}
    >
      <div className={`h-2 bg-gradient-to-r ${gradientColor}`}></div>
      <CardContent className="p-6 gap-2 flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <TextHeading lineClamp={2} className="">
              {course.title}
            </TextHeading>
            <Badge variant={course.status ? 'default' : 'secondary'} className="mt-2 text-xs">
              <IconBookmark className="w-3 h-3 mr-1" />
              {course.status ? (variant === 'teacher' ? t('active') : t('learning')) : t('paused')}
            </Badge>
          </div>
          <IconChevronRight
            className={`w-5 h-5 text-muted-foreground ${hoverColor} group-hover:translate-x-1 transition-all`}
          />
        </div>

        <div className="mt-auto">
          <TextDescription lineClamp={2}>
            {util_remove_html_tags(course.description)}
          </TextDescription>
        </div>

        <div className="flex mt-auto items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <IconUsers className="w-4 h-4" />
              <span>
                {course?.enrollmentCount ?? 0}                {t('students').toLowerCase()}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <IconTarget className="w-4 h-4" />
              <span>
                {course?.topicCount ?? 0} {t('topics').toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Teacher specific actions */}
        {variant === 'teacher' && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
              onClick={e => {
                e.stopPropagation();
                router.push(paths.COURSE_TOPICS(course.id));
              }}
            >
              <IconChalkboard className="w-3 h-3 mr-1" />
              {t('topics')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
              onClick={e => {
                e.stopPropagation();
                router.push(paths.COURSE_MEMBER(course.id));
              }}
            >
              <IconUsers className="w-3 h-3 mr-1" />
              {t('members')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
