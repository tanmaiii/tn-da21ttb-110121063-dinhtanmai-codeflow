'use client';
import CardPost from '@/components/common/CardPost/CardPost';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import NoData from '@/components/common/NoData/NoData';
import { PostListSkeleton } from '@/components/skeletons/post';
import { Button } from '@/components/ui/button';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useQ_Post_GetAll from '@/hooks/query-hooks/Post/useQ_Post_GetAll';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { IPost } from '@/interfaces/post';
import { useUserStore } from '@/stores/user_store';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Posts() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const { localPath } = useH_LocalPath();
  const t = useTranslations('post');
  const { user } = useUserStore();

  const Q_Post = useQ_Post_GetAll({
    params: {
      page: Number(page),
      limit: 8,
      sortBy: 'createdAt',
      order: 'DESC',
    },
  });

  if (Q_Post.error) return <TextDescription>Error...</TextDescription>;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="border-b py-2 flex items-center justify-between flex-row gap-4">
        <div className="flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md text-primary">
          <TextHeading>{t('post')}</TextHeading>
        </div>
        {user && user?.role !== 'user' && (
          <Button
            onClick={() => route.push(localPath(paths.POST_CREATE))}
            variant="outline"
            className="bg-background-1"
            size="sm"
          >
            {t('createPost')}
          </Button>
        )}
      </div>
      <div className="min-h-[600px]">
        {Q_Post.isLoading && <PostListSkeleton />}
        {Q_Post.data?.data?.length === 0 && <NoData />}
        <div className="grid grid-cols-1 gap-4 md:gap-4 xl:gap-8 md:grid-cols-3 xl:grid-cols-4 py-2 mt-6">
          {Q_Post.data &&
            Q_Post.data?.data?.map((post: IPost) => <CardPost key={post.id} post={post} />)}
        </div>
      </div>
      <div className="my-6">
        <MyPagination
          currentPage={Number(page)}
          totalPages={Q_Post.data?.pagination.totalPages ?? 1}
          onPageChange={(page: number) => {
            route.push(`${localPath(paths.POSTS)}?page=${page}`);
          }}
        />
      </div>
    </div>
  );
}
