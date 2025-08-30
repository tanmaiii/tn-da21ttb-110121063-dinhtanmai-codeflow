'use client';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import useQ_Post_GetAll from '@/hooks/query-hooks/Post/useQ_Post_GetAll';
import apiConfig from '@/lib/api';
import { useRouter } from 'next/navigation';
import { paths } from '@/data/path';
import { useParams } from 'next/navigation';
import { TrendingUpIcon, ClockIcon } from 'lucide-react';
import { utils_TimeAgo } from '@/utils/date';
import { util_CalculateReadingTime } from '@/utils/common';
import { useTranslations } from 'next-intl';
import MyImage from '@/components/common/MyImage';

export default function PostDetailMore() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();
  const id = params?.id;
  const Q_Post = useQ_Post_GetAll({
    params: {
      page: 1,
      limit: 5,
      sortBy: 'createdAt',
      order: 'DESC',
    },
  });

  if (Q_Post.isLoading) {
    return (
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (Q_Post.error) {
    return (
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">⚠️</div>
          <TextDescription>Không thể tải bài viết liên quan</TextDescription>
        </div>
      </Card>
    );
  }

  const relatedPosts = Q_Post.data?.data.filter(post => post.id !== id?.toString()) || [];

  if (relatedPosts.length === 0) return null;

  return (
    <Card className="shadow-lg p-0 border-0 bg-background-1 backdrop-blur-sm gap-0 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 border-b border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUpIcon className="w-5 h-5 text-blue-600" />
          <TextHeading className="text-xl">{t('post.relatedPosts')}</TextHeading>
        </div>
        <TextDescription>{t('post.exploreMore')}</TextDescription>
      </div>

      {/* Posts List */}
      <div className="p-4">
        <div className="space-y-2">
          {relatedPosts.map((post) => (
            <article
              key={post.id}
              className="cursor-pointer transition-all duration-300 hover:bg-primary/10 rounded-md p-2"
              onClick={() => {
                router.push(paths.POSTS + '/' + post.id);
              }}
            >
              <div className="flex gap-2">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-sm overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <MyImage
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      src={
                        post?.thumbnail ? apiConfig.imageUrl(post.thumbnail) : IMAGES.DEFAULT_COURSE
                      }
                      alt={post.title}
                      width={80}
                      height={80}
                      defaultSrc={IMAGES.DEFAULT_COURSE.src}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <TextHeading lineClamp={2} className="text-sm">
                    {post.title}
                  </TextHeading>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ClockIcon className="w-3 h-3" />
                    <span>{util_CalculateReadingTime(post.content ?? '')} {t('post.readTime')}</span>
                    <span>•</span>
                    <span>{utils_TimeAgo(post.createdAt ?? '')}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Card>
  );
}
