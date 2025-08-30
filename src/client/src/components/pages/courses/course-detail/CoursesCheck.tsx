'use client';
import PasswordInput from '@/components/common/Input/PasswordInput/PasswordInput';
import MyImage from '@/components/common/MyImage';
import NameTags from '@/components/common/NameTags/NameTags';
import SwapperHTML from '@/components/common/SwapperHTML/SwapperHTML';
import TitleHeader from '@/components/layout/TitleHeader';
import { CourseDetailSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ROLE } from '@/constants/enum';
import { IMAGES } from '@/data/images';
import courseService from '@/services/course.service';
import { useUserStore } from '@/stores/user_store';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCalendar, IconClockHour1, IconUsers } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BookOpen, CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const joinCourseSchema = () =>
  z.object({
    password: z.string().optional(),
  });

export type JoinCourseSchemaType = z.infer<ReturnType<typeof joinCourseSchema>>;

export default function CoursesCheck({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const params = useParams();
  const queryClient = useQueryClient();
  const courseId = params?.id as string;
  const t = useTranslations('course');
  const [err, setErr] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JoinCourseSchemaType>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(joinCourseSchema()),
  });

  const { data: isJoined, isLoading: isLoadingJoin } = useQuery({
    queryKey: ['course', courseId, user, 'join'],
    queryFn: async () => {
      const response = await courseService.checkJoinCourse(courseId);
      return response.data;
    },
    enabled: !!user && !!courseId,
  });

  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', courseId, 'detail'],
    queryFn: async () => {
      const response = await courseService.getById(courseId);
      return response.data;
    },
    enabled: !!courseId,
  });

  const joinCourseMutation = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      courseService.joinCourse(courseId, password),
    onSuccess: () => {
      toast.success('Tham gia khóa học thành công!');
      queryClient.invalidateQueries({ queryKey: ['course', courseId, user, 'join'] });
      reset();
    },
    onError: (err: unknown) => {
      setErr((err as Error)?.message || t('error'));
    },
  });

  const onSubmit = (data: JoinCourseSchemaType) => {
    joinCourseMutation.mutate({ password: data.password ?? '' });
  };

  const isAuthor = course?.authorId === user?.id;
  if (isLoadingJoin || isLoadingCourse) return <CourseDetailSkeleton />;

  if (!isJoined && course && !isAuthor) {
    const isRegistrationOpen =
      new Date(course?.regStartDate ?? '') < new Date() &&
      new Date(course?.regEndDate ?? '') > new Date();

    const isStudent = user?.role === ROLE?.USER;

    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden shadow-lg p-0">
                {/* Course Header with Image */}
                <div className="relative">
                  <div className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden">
                    <MyImage
                      src={
                        course?.thumbnail
                          ? utils_ApiImageToLocalImage(course.thumbnail)
                          : IMAGES.DEFAULT_COURSE
                      }
                      alt={course.title}
                      fill
                      defaultSrc={IMAGES.DEFAULT_COURSE.src}
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Course title overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <TitleHeader title={course?.title} onBack={true} className="text-white" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <MemberAvatar
                      name={course?.author?.name ?? ''}
                      description=""
                      size={40}
                      id={course?.author?.id}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconCalendar className="size-5 text-blue-600" />
                        </div>
                        <div>
                          <TextDescription className="text-sm text-gray-600">
                            {t('registrationPeriod')}
                          </TextDescription>
                          <TextHeading className="font-semibold">
                            {utils_DateToDDMMYYYY(course?.regStartDate)} -{' '}
                            {utils_DateToDDMMYYYY(course?.regEndDate)}
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
                            {t('courseDuration')}
                          </TextDescription>
                          <TextHeading className="font-semibold">
                            {utils_DateToDDMMYYYY(course?.startDate)} -{' '}
                            {utils_DateToDDMMYYYY(course?.endDate)}
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
                            {t('topicDeadline')}
                          </TextDescription>
                          <TextHeading className="font-semibold">
                            {utils_DateToDDMMYYYY(course?.topicDeadline)}
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
                            {t('maxGroupMembers')}
                          </TextDescription>
                          <TextHeading className="font-semibold">
                            {course?.maxGroupMembers}
                          </TextHeading>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Course Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {t('description')}
                    </h3>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <SwapperHTML content={course?.description ?? ''} />
                    </div>
                  </div>

                  {/* Tags */}
                  {course?.tags && course?.tags?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">{t('tags')}</h3>
                      <NameTags
                        className="p-4 rounded-lg border"
                        tags={course.tags}
                        max={course?.tags?.length}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-14">
                <Card className="shadow-lg border-2 border-primary/10 p-0">
                  <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-primary/10 border-b p-6">
                    <CardTitle className="text-2xl text-primary">{t('joinCourse')}</CardTitle>
                    <CardDescription className="text-base">
                      {isRegistrationOpen ? t('enterPasswordToJoin') : t('notInRegistrationPeriod')}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    {isRegistrationOpen && isStudent ? (
                      <div className="space-y-6">
                        {err && (
                          <div className="flex flex-row items-center gap-2 text-white text-sm bg-red-400 py-2 px-3 border rounded-md mb-4">
                            <CircleAlert style={{ width: '26px', height: '26px' }} />
                            <span>{err}</span>
                          </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                          <PasswordInput
                            label={'Password'}
                            error={errors.password?.message}
                            description={t('joinDescription')}
                            registration={register('password')}
                          />
                          <Button
                            type="submit"
                            className="w-full h-12 font-semibold"
                            disabled={joinCourseMutation.isPending}
                          >
                            {joinCourseMutation.isPending ? t('joining') : t('join')}
                          </Button>
                        </form>

                        {/* Registration period info */}
                        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">{t('registrationPeriod')}:</span>
                          </p>
                          <p className="text-sm font-medium mt-1">
                            {utils_DateToDDMMYYYY(course.regStartDate)} -{' '}
                            {utils_DateToDDMMYYYY(course.regEndDate)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mb-6 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                          <p className="text-orange-800 dark:text-orange-200 font-medium mb-2">
                            {isStudent ? t('notInRegistrationPeriod') : t('onlyStudent')}
                          </p>
                          <p className="text-sm text-orange-600 dark:text-orange-300">
                            {t('registrationPeriod')}: {utils_DateToDDMMYYYY(course.regStartDate)} -{' '}
                            {utils_DateToDDMMYYYY(course.regEndDate)}
                          </p>
                        </div>
                        <Button variant="default" disabled className="w-full h-12">
                          {isStudent ? t('notInRegistrationPeriod') : t('onlyStudent')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}
