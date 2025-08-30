'use client';
import ChartCodeQuality from '@/components/common/MyChart/ChartCodeQuality';
import ChartLineCodeActivity from '@/components/common/MyChart/ChartLineCodeActivity';
import ChartPieLanguage from '@/components/common/MyChart/ChartPieLanguage';
import ChartTopicStatus from '@/components/common/MyChart/ChartTopicStatus';
import StatCard from '@/components/common/StatCard';
import TextHeading, { TextDescription } from '@/components/ui/text';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import useQ_Dashboard_GetCodeActivity from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetCodeActivity';
import useQ_Dashboard_GetCodeAnalysis from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetCodeAnalysis';
import useQ_Dashboard_GetCourseStatus from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetCourseStatus';
import useQ_Dashboard_GetCourseTypes from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetCourseTypes';
import useQ_Dashboard_GetFramework from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetFramework';
import useQ_Dashboard_GetTags from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetTags';
import useQ_Dashboard_GetTopicStatus from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetTopicStatus';
import useQ_Post_GetAll from '@/hooks/query-hooks/Post/useQ_Post_GetAll';
import useQ_Repos_GetAll from '@/hooks/query-hooks/Repos/useQ_Repos_GetAll';
import useQ_Topic_GetAll from '@/hooks/query-hooks/Topic/useQ_Topic_GetAll';
import useQ_User_GetAll from '@/hooks/query-hooks/User/useQ_User_GetAll';
import { IconBrandGithub, IconMessageCircle } from '@tabler/icons-react';
import { BookOpen, Folder, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChartPieCoursesStatus, ChartPieCoursesType, ChartTags, FeaturedStudents } from './components';
import { util_format_number_compact } from '@/utils/common';

export default function Dashboard() {
  const [selectedDays, setSelectedDays] = useState(7);
  const { data: users, isLoading: isLoadingTotal } = useQ_User_GetAll({
    params: { page: 1, limit: 0 },
  });
  const { data: courses } = useQ_Course_GetAll({ params: { page: 1, limit: 0 } });
  const { data: topics } = useQ_Topic_GetAll({ params: { page: 1, limit: 0 } });
  const { data: repos } = useQ_Repos_GetAll({ params: { page: 1, limit: 0 } });
  const { data: posts } = useQ_Post_GetAll({ params: { page: 1, limit: 0 } });

  const { data, isLoading } = useQ_Dashboard_GetCodeActivity({ days: selectedDays });
  const { data: tags, isLoading: isLoadingTags } = useQ_Dashboard_GetTags({});
  const { data: framework, isLoading: isLoadingFramework } = useQ_Dashboard_GetFramework({});
  const { data: courseTypes, isLoading: isLoadingCourseTypes } = useQ_Dashboard_GetCourseTypes({});
  const { data: topicStatus, isLoading: isLoadingTopicStatus } = useQ_Dashboard_GetTopicStatus({});
  const { data: courseStatus, isLoading: isLoadingCourseStatus } = useQ_Dashboard_GetCourseStatus(
    {},
  );
  const { data: codeAnalysis, isLoading: isLoadingCodeAnalysis } = useQ_Dashboard_GetCodeAnalysis(
    {},
  );

  const t = useTranslations('dashboard');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <TextHeading className="text-4xl font-bold">Codeflow</TextHeading>
              <TextDescription className="text-sm text-gray-500"></TextDescription>
            </div>
            <div className="flex items-center space-x-4"></div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title={t('totalUsers')}
            value={util_format_number_compact(users?.pagination?.totalItems ?? 0)}
            icon={Users}
            isLoading={isLoadingTotal}
            color="default"
          />
          <StatCard
            title={t('totalCourses')}
            value={util_format_number_compact(courses?.pagination?.totalItems ?? 0)}
            icon={BookOpen}
            isLoading={isLoadingTotal}
            color="success"
          />
          <StatCard
            title={t('totalTopics')}
            value={util_format_number_compact(topics?.pagination?.totalItems ?? 0)}
            icon={Folder}
            isLoading={isLoadingTotal}
            color="warning"
          />
          <StatCard
            title={t('totalRepos')}
            value={util_format_number_compact(repos?.pagination?.totalItems ?? 0)}
            icon={IconBrandGithub}
            isLoading={isLoadingTotal}
            color="default"
          />
          <StatCard
            title={t('totalPosts')}
            value={util_format_number_compact(posts?.pagination?.totalItems ?? 0)}
            icon={IconMessageCircle}
            isLoading={isLoadingTotal}
            color="success"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartLineCodeActivity
            data={data?.data}
            setSelectedDays={setSelectedDays}
            selectedDays={selectedDays}
            isLoading={isLoading}
          />
          <ChartTags tags={tags?.data ?? []} isLoading={isLoadingTags} />
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartPieLanguage framework={framework?.data ?? []} isLoading={isLoadingFramework} />
          <ChartPieCoursesType
            courseTypes={courseTypes?.data ?? []}
            isLoading={isLoadingCourseTypes}
          />
          <ChartPieCoursesStatus data={courseStatus?.data} isLoading={isLoadingCourseStatus} />
        </div>

        {/* Test & Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 w-full">
          <ChartTopicStatus data={topicStatus?.data} isLoading={isLoadingTopicStatus} />
          <ChartCodeQuality data={codeAnalysis?.data} isLoading={isLoadingCodeAnalysis} />
        </div>

        {/* Featured Students and Courses */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> */}
          <FeaturedStudents />
        {/* </div> */}
      </div>
    </div>
  );
}
