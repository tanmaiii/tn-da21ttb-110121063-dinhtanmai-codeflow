import { Button } from '@/components/ui/button';
import { paths } from '@/data/path';
import { IconBook, IconChalkboard, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  variant: 'student' | 'teacher';
}

export default function EmptyState({ variant }: EmptyStateProps) {
  const router = useRouter();
  const t = useTranslations('dashboard');

  if (variant === 'student') {
    return (
      <div>
        <div className="p-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <IconBook className="w-12 h-12 text-blue-600" />
          </div>
          <h4 className="text-xl font-semibold  mb-2">{t('noCourses')}</h4>
          <p className="text-muted-foreground mb-6">{t('startLearningJourney')}</p>
          <Button
            onClick={() => router.push(paths.COURSES)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <IconPlus className="w-4 h-4 mr-2" />
            {t('exploreCourses')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-12 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
          <IconChalkboard className="w-12 h-12 text-indigo-600" />
        </div>
        <h4 className="text-xl font-semibold  mb-2">{t('noCourses')}</h4>
        <p className="text-muted-foreground mb-6">{t('createFirstCourse')}</p>
        <Button
          onClick={() => router.push(paths.COURSE_CREATE)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <IconPlus className="w-4 h-4 mr-2" />
          {t('createFirstCourseBtn')}
        </Button>
      </div>
    </div>
  );
}
