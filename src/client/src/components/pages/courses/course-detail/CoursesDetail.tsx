'use client';
import CardFile from '@/components/common/CardFile/CardFile';
import Comments from '@/components/common/Comments/Comments';
import MyImage from '@/components/common/MyImage';
import NameTags from '@/components/common/NameTags/NameTags';
import NoData from '@/components/common/NoData/NoData';
import SwapperHTML from '@/components/common/SwapperHTML/SwapperHTML';
import TitleHeader from '@/components/layout/TitleHeader';
import { CourseDetailSkeleton } from '@/components/skeletons/course';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { TYPE_COURSE } from '@/constants/object';
import { paths } from '@/data/path';
import useQ_Course_GetComments from '@/hooks/query-hooks/Course/useQ_Course_GetComments';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import apiConfig from '@/lib/api';
import commentService from '@/services/comment.service';
import { useUserStore } from '@/stores/user_store';
import { util_get_course_status } from '@/utils/common';
import {
  utils_CalculateProgress,
  utils_DateToDDMMYYYY,
  utils_DateToDDMonth,
  utils_TimeAgo,
  utils_TimeRemaining,
} from '@/utils/date';
import {
  IconCalendar,
  IconClockHour1,
  IconPencil,
  IconShare,
  IconUsers,
} from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CoursesSummary from './CoursesSummary';
import Courses_Topics from './CoursesTopics';

export default function CoursesDetail() {
  const params = useParams();
  const id = params?.id as string;
  const tCourse = useTranslations('course');
  const t = useTranslations();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const {
    data: dataCourse,
    isLoading,
    isError,
  } = useQ_Course_GetDetail({
    id: id,
  });

  const mutionComment = useMutation({
    mutationFn: (value: string) => {
      return commentService.create({
        content: value,
        courseId: dataCourse?.data?.id ?? '',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', 'comments', id] });
    },
  });

  const { data: dataComments } = useQ_Course_GetComments({
    id: id,
  });

  if (isLoading) return <CourseDetailSkeleton />;
  if (!dataCourse) return <NoData />;
  if (isError) return <div>Error</div>;

  const courseType = TYPE_COURSE.find(item => item.value === dataCourse.data?.type);
  const isOwner = user?.id === dataCourse.data?.author?.id;
  
  // Sử dụng hàm utils để xác định trạng thái khóa học
  const courseStatus = util_get_course_status(
    dataCourse?.data?.startDate ?? '',
    dataCourse?.data?.endDate ?? '',
    dataCourse?.data?.regStartDate,
    dataCourse?.data?.regEndDate
  );
  
  const hasStarted = courseStatus === 'started' || courseStatus === 'finished';
  const isRegistrationOpen = courseStatus === 'registering';

  const onClickCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <TitleHeader title="" onBack={true} className="text-white" />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClickCopy}
                className="text-white hover:bg-white/20"
              >
                <IconShare className="size-5" />
              </Button>
              {isOwner && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => router.push(localPath(paths.COURSE_UPDATE(id)))}
                >
                  <IconPencil className="size-5" />
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-4">
                {courseType?.labelKey ? t(courseType.labelKey) : dataCourse.data?.type}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {dataCourse.data?.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <MyImage
                    className="w-14 h-14 object-cover rounded-full border-2 border-white/30"
                    src={
                      dataCourse.data?.author?.avatar
                        ? dataCourse.data?.author?.avatar
                        : apiConfig.avatar(dataCourse.data?.author?.name ?? 'c')
                    }
                    alt={dataCourse.data?.title}
                    width={56}
                    height={56}
                    defaultSrc={apiConfig.avatar(dataCourse.data?.author?.name ?? 'c')}
                  />
                  <div>
                    <p className="font-semibold text-lg">{dataCourse.data?.author?.name}</p>
                    {dataCourse.data?.createdAt && (
                      <p className="text-white/80 text-sm">
                        {utils_DateToDDMonth(dataCourse.data?.createdAt ?? '')} -{' '}
                        {utils_TimeAgo(dataCourse.data?.createdAt ?? '')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Status Card */}
              {hasStarted && (
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <IconClockHour1 className="size-6 text-yellow-300" />
                    <div>
                      <TextHeading className="text-white">{tCourse('topicDeadline')}</TextHeading>
                      <TextDescription className="text-white/80">
                        {utils_DateToDDMMYYYY(dataCourse.data?.topicDeadline)}
                      </TextDescription>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <TextDescription className="text-white/80">
                        {tCourse('progress')}
                      </TextDescription>
                      <TextDescription className="text-white/80">
                        {utils_CalculateProgress(
                          dataCourse.data?.startDate ?? '',
                          dataCourse.data?.topicDeadline ?? '',
                        )}
                        %
                      </TextDescription>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className={cx(
                          'h-2 rounded-full transition-all duration-500',
                          utils_CalculateProgress(
                            dataCourse.data?.startDate ?? '',
                            dataCourse.data?.topicDeadline ?? '',
                          ) >= 90
                            ? 'bg-red-400'
                            : 'bg-green-400',
                        )}
                        style={{
                          width: `${utils_CalculateProgress(
                            dataCourse.data?.startDate ?? '',
                            dataCourse.data?.topicDeadline ?? '',
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-white/80 text-sm">
                      {utils_TimeRemaining(dataCourse.data?.topicDeadline)}
                    </p>
                  </div>
                </Card>
              )}

              {!hasStarted && (
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                  <div className="flex items-center gap-3">
                    <IconClockHour1 className="size-6 text-white" />
                    <div>
                      <TextHeading className="text-white">
                        {courseStatus === 'not_started'
                          ? tCourse('registrationNotStarted')
                          : courseStatus === 'registering'
                          ? tCourse('registrationOpen')
                          : tCourse('registrationClosed')}
                      </TextHeading>
                    </div>
                  </div>
                  {isRegistrationOpen && (
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <TextDescription className="text-white/80">
                          {tCourse('registrationProgress')}
                        </TextDescription>
                        <TextDescription className="text-white/80">
                          {utils_CalculateProgress(
                            dataCourse.data?.regStartDate ?? '',
                            dataCourse.data?.regEndDate ?? '',
                          )}
                          %
                        </TextDescription>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="h-2 bg-green-400 rounded-full transition-all duration-500"
                          style={{
                            width: `${utils_CalculateProgress(
                              dataCourse.data?.regStartDate ?? '',
                              dataCourse.data?.regEndDate ?? '',
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-white/80 text-sm">
                        Ends {utils_DateToDDMMYYYY(dataCourse.data?.regEndDate)}(
                        {utils_TimeRemaining(dataCourse.data?.regEndDate)})
                      </p>
                    </div>
                  )}
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8 ">
            {/* Course Info Cards */}
            <NameTags
              className="mt-2 p-4 rounded-sm bg-background-1 mb-6"
              tags={dataCourse.data?.tags}
              max={dataCourse.data?.tags?.length ?? 3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconCalendar className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <TextDescription className="text-sm text-gray-600">
                      {tCourse('registrationPeriod')}
                    </TextDescription>
                    <TextHeading className="font-semibold">
                      {utils_DateToDDMMYYYY(dataCourse.data?.regStartDate)} -{' '}
                      {utils_DateToDDMMYYYY(dataCourse.data?.regEndDate)}
                    </TextHeading>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <IconCalendar className="size-5 text-green-600" />
                  </div>
                  <div>
                    <TextDescription className="text-sm text-gray-600">
                      {tCourse('courseDuration')}
                    </TextDescription>
                    <TextHeading className="font-semibold">
                      {utils_DateToDDMMYYYY(dataCourse.data?.startDate)} -{' '}
                      {utils_DateToDDMMYYYY(dataCourse.data?.endDate)}
                    </TextHeading>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <IconClockHour1 className="size-5 text-purple-600" />
                  </div>
                  <div>
                    <TextDescription className="text-sm text-gray-600">
                      {tCourse('topicDeadline')}
                    </TextDescription>
                    <TextHeading className="font-semibold">
                      {utils_DateToDDMMYYYY(dataCourse.data?.topicDeadline)}
                    </TextHeading>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <IconUsers className="size-5 text-orange-600" />
                  </div>
                  <div>
                    <TextDescription className="text-sm text-gray-600">
                      {tCourse('maxGroupMembers')}
                    </TextDescription>
                    <TextHeading className="font-semibold">
                      {dataCourse.data?.maxGroupMembers}
                    </TextHeading>
                  </div>
                </div>
              </Card>
            </div>

            {/* Description */}
            <Card className="p-8 mb-6">
              <TextHeading className="text-2xl font-bold flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                {tCourse('description')}
              </TextHeading>
              <div className="prose prose-lg max-w-none">
                <SwapperHTML content={dataCourse.data?.description ?? ''} />
              </div>
            </Card>

            {/* Documents */}
            {dataCourse.data?.documents && dataCourse.data?.documents?.length > 0 && (
              <Card className="p-8">
                <div className="flex items-center justify-between">
                  <TextHeading className="text-2xl font-bold flex items-center gap-2">
                    <div className="w-1 h-6 bg-green-600 rounded-full"></div>
                    {tCourse('documents')}
                  </TextHeading>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {dataCourse.data?.documents?.map(file => (
                    <CardFile key={file.id} file={file} />
                  ))}
                </div>
              </Card>
            )}

            {/* Topics */}
            <Card className="p-8">
              <TextHeading className="text-2xl font-bold flex items-center gap-2">
                <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                {tCourse('topics')}
              </TextHeading>
              <Courses_Topics />
            </Card>

            {/* Comments */}
            <Card className="p-8">
              {dataComments?.data && (
                <Comments
                  onSubmit={value => mutionComment.mutate(value)}
                  comments={dataComments.data}
                />
              )}
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {dataCourse.data && <CoursesSummary course={dataCourse.data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
