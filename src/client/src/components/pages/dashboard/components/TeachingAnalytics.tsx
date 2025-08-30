import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconAward, IconUsers, IconCheckbox, IconClock } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface TeachingAnalyticsProps {
  stats: {
    totalStudents: number;
    activeCourses: number;
    pendingTopics: number;
  };
}

export default function TeachingAnalytics({ stats }: TeachingAnalyticsProps) {
  const t = useTranslations('dashboard');
  
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <IconAward className="w-5 h-5 mr-2 text-indigo-600" />
          {t('teachingStats')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <IconUsers className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
            <p className="text-sm text-muted-foreground">{t('totalStudents')}</p>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <IconCheckbox className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold">{stats.activeCourses}</p>
            <p className="text-sm text-muted-foreground">{t('activeCoursesFull')}</p>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
            <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
              <IconClock className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold">{stats.pendingTopics}</p>
            <p className="text-sm text-muted-foreground">{t('pendingTopics')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 