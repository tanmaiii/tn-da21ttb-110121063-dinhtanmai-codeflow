'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { TYPE_COURSE } from '@/constants/object';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import { ICourse } from '@/interfaces/course';
import apiConfig from '@/lib/api';
import courseService from '@/services/course.service';
import { useUserStore } from '@/stores/user_store';
import { utils_TimeAgo } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MyImage from '../MyImage';
import NameTags from '../NameTags/NameTags';
import CardCourse_More from './CardCourse_More';
import CardCourse_Submit from './CardCourse_Submit';
interface CardCourseProps {
  course: ICourse;
}

export default function CardCourse({ course }: CardCourseProps) {
  const tCourse = useTranslations('course');
  const t = useTranslations();
  const { user } = useUserStore();
  const router = useRouter();

  const { data: isJoined } = useQuery({
    queryKey: ['course', course.id, user],
    queryFn: async () => {
      const response = await courseService.checkJoinCourse(course.id);
      return response.data;
    },
    enabled: !!user && !!course.id,
  });

  return (
    <Card className="w-full h-full gap-4 pt-3 overflow-hidden group">
      <CardHeader className="px-3">
        <div className="relative">
          <MyImage
            src={utils_ApiImageToLocalImage(course.thumbnail)}
            alt={course?.title ?? 'Course thumbnail'}
            width={200}
            height={160}
            className="object-cover w-full h-[120px] rounded-md cursor-pointer"
            defaultSrc={IMAGES.DEFAULT_COURSE.src}
          />
          <div className="absolute top-1 left-1">
            <Badge variant="default" className="bg-zinc-900/40 text-white">
              {t(TYPE_COURSE.find(type => type.value === course.type)?.labelKey ?? '')}
            </Badge>
          </div>
          <CardCourse_More
            course={course}
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </CardHeader>
      <CardContent className="min-h-[60px] px-4 flex flex-1 flex-col gap-2">
        <Link
          href={paths.USER_DETAIL(course?.author?.id ?? '')}
          className="flex items-center gap-2"
        >
          <MyImage
            src={course?.author?.avatar ? course?.author?.avatar : apiConfig.avatar(course?.author?.name ?? 'c')}
            alt={course?.author?.avatar ?? ''}
            width={100}
            height={100}
            className="object-cover w-6 h-6 circle rounded-full"
            defaultSrc={apiConfig.avatar(course?.author?.name ?? 'c')}
          />
          <TextDescription className="text-primary line-clamp-1 ">
            {course?.author?.name}
          </TextDescription>
        </Link>
        <Link href={paths.COURSES_DETAIL(course.id)} className="text-lg">
          <TextHeading className="line-clamp-2 hover:underline">{course.title}</TextHeading>
        </Link>
        <NameTags className="mt-auto" tags={course?.tags} />
      </CardContent>
      <CardFooter className="flex flex-col px-4 w-full gap-2 items-start mt-auto">
        {isJoined || user?.id === course.authorId ? (
          <Button
            className="w-full dark:text-white"
            onClick={() => router.push(paths.COURSES_DETAIL(course.id))}
          >
            {`${tCourse('view')}`}
          </Button>
        ) : (
          <CardCourse_Submit courseId={course.id} />
        )}
        <TextDescription>
          {tCourse('updated')} {utils_TimeAgo(new Date(course.updatedAt ?? ''))}
        </TextDescription>
      </CardFooter>
    </Card>
  );
}
