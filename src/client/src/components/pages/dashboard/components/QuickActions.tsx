import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconPlus, IconArrowRight, IconTarget } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { paths } from '@/data/path';
import { useTranslations } from 'next-intl';

interface QuickActionsProps {
  variant: 'student' | 'teacher';
}

export default function QuickActions({ variant }: QuickActionsProps) {
  const router = useRouter();
  const t = useTranslations('dashboard');

  if (variant === 'student') {
    return (
      <Card className="border-0 p-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{t('startLearningToday')}</h3>
              <p className="text-muted-foreground">
                {t('exploreSkills')}
              </p>
            </div>
            <Button
              onClick={() => router.push(paths.COURSES)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              <IconPlus className="w-4 h-4 mr-2" />
              {t('joinCourse')}
              <IconArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-0 p-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{t('createNewCourse')}</h3>
              <p className="text-muted-foreground">{t('shareKnowledge')}</p>
            </div>
            <Button 
              onClick={() => router.push(paths.COURSE_CREATE)} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
            >
              <IconPlus className="w-4 h-4 mr-2" />
              {t('createNew')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 p-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{t('manageTopics')}</h3>
              <p className="text-muted-foreground">{t('reviewApprove')}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => router.push(paths.TOPICS)} 
              className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
            >
              <IconTarget className="w-4 h-4 mr-2" />
              {t('manage')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 