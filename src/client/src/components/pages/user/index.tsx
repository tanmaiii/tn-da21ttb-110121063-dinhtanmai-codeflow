'use client';
import CardCourse from '@/components/common/CardCourse/CardCourse';
import CardPost from '@/components/common/CardPost/CardPost';
import CardTopic from '@/components/common/CardTopic';
import TitleHeader from '@/components/layout/TitleHeader';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useQ_Course_GetAllRegistered from '@/hooks/query-hooks/Course/useQ_Course_GetAllRegistered';
import useQ_Post_GetAllByUser from '@/hooks/query-hooks/Post/useQ_Post_GetAllByUser';
import useQ_Topic_GetAllByUserId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByUserId';
import useQ_User_GetDetail from '@/hooks/query-hooks/User/useQ_User_GetDetail';
import { useParams } from 'next/navigation';
import UserDetail from './UserDetail';
import { useTranslations } from 'next-intl';
import useQ_Course_GetAllByUser from '@/hooks/query-hooks/Course/useQ_Course_GetAllByUser';
import { ROLE } from '@/constants/enum';

export default function User() {
  const params = useParams();
  const userId = params?.id as string;
  const t = useTranslations('users');

  const { data: User } = useQ_User_GetDetail({
    id: userId,
  });

  const { data: topics } = useQ_Topic_GetAllByUserId({
    params: {
      page: 1,
      limit: -1,
      userId: userId,
    },
  });

  const { data: registeredCourses } = useQ_Course_GetAllRegistered({
    params: {
      page: 1,
      limit: -1,
    },
  });

  const { data: createdCourses } = useQ_Course_GetAllByUser({
    params: {
      page: 1,
      limit: -1,
    },
    userId: userId,
  });

  const { data: posts } = useQ_Post_GetAllByUser({
    params: {
      page: 1,
      limit: -1,
    },
    userId: userId,
  });

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex-1 col-span-12 px-8 py-6">
        {User?.data.role === ROLE.TEACHER && (
          <div className="mt-4">
            <TitleHeader title={t('coursesCreated')} />
            {createdCourses?.data && createdCourses?.data.length > 0 ? (
              <div>
                <Carousel opts={{ align: 'start' }} className="w-full">
                  <CarouselContent className="py-2">
                    {createdCourses?.data?.map(course => (
                      <CarouselItem
                        key={course?.id}
                        className="basis-1/1 md:basis-1/2 lg:basis-1/3"
                      >
                        <CardCourse course={course} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-7" />
                  <CarouselNext className="mr-7" />
                </Carousel>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full min-h-[300px]">
                <p className="text-sm text-gray-500">{t('noCourses')}</p>
              </div>
            )}
          </div>
        )}

        {registeredCourses?.data && registeredCourses?.data.length > 0 && (
          <div className="mt-4">
            <TitleHeader title={t('coursesRegistered')} />
            <div>
              <Carousel opts={{ align: 'start' }} className="w-full">
                <CarouselContent className="py-2">
                  {registeredCourses?.data?.map(course => (
                    <CarouselItem key={course?.id} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                      <CardCourse course={course} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-7" />
                <CarouselNext className="mr-7" />
              </Carousel>
            </div>
          </div>
        )}

        {topics?.data && topics?.data.length > 0 && (
          <div className="mt-4">
            <TitleHeader title={t('topics')} />
            <div>
              <Carousel opts={{ align: 'start' }} className="w-full">
                <CarouselContent className="py-2">
                  {topics?.data?.map(topic => (
                    <CarouselItem key={topic?.id} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                      <CardTopic topic={topic} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-7" />
                <CarouselNext className="mr-7" />
              </Carousel>
            </div>
          </div>
        )}

        {posts?.data && posts?.data.length > 0 && (
          <div className="mt-4">
            <TitleHeader title={t('posts')} />
            <div>
              <Carousel opts={{ align: 'start' }} className="w-full">
                <CarouselContent className="py-2">
                  {posts?.data?.map(post => (
                    <CarouselItem key={post?.id} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                      <CardPost post={post} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-7" />
                <CarouselNext className="mr-7" />
              </Carousel>
            </div>
          </div>
        )}
      </div>

      <div className="w-[100%] md:w-[300px] lg:w-[400px] col-span-12 border-l">
        <div className="sticky top-14">{User && <UserDetail user={User?.data} />}</div>
      </div>
    </div>
  );
}
