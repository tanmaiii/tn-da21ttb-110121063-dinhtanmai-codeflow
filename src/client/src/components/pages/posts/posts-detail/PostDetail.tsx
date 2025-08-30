'use client';

import Comments from '@/components/common/Comments/Comments';
import MyImage from '@/components/common/MyImage';
import NameTags from '@/components/common/NameTags/NameTags';
import SwapperHTML from '@/components/common/SwapperHTML/SwapperHTML';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import useQ_Post_CheckLike from '@/hooks/query-hooks/Post/useQ_Post_CheckLike';
import useQ_Post_GetComments from '@/hooks/query-hooks/Post/useQ_Post_GetComments';
import useQ_Post_GetDetail from '@/hooks/query-hooks/Post/useQ_Post_GetDetail';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import apiConfig from '@/lib/api';
import commentService from '@/services/comment.service';
import postService from '@/services/post.service';
import { useUserStore } from '@/stores/user_store';
import { utils_DateToDDMonth, utils_TimeAgo } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { IconBookmark, IconBookmarkFilled, IconShare } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import 'highlight.js/styles/github.css'; // Import theme
import { ArrowLeftIcon, HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Post_Detail_Props {
  postId: string;
}

export default function PostDetail({
  postId,
}: Post_Detail_Props) {
  const { localPath } = useH_LocalPath();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const {data: PostData, isLoading, isError} = useQ_Post_GetDetail({id: postId});

  const uesQ_Post_Like = useQ_Post_CheckLike({
    id: postId,
  });

  // Use SSR data as initial data for React Query
  const { data: commentData } = useQ_Post_GetComments({
    id: postId,
  });

  const mutationComment = useMutation({
    mutationFn: (value: string) => {
      const res = commentService.create({
        content: value,
        postId: postId,
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', 'comments', postId],
      });
    },
  });

  const mutationLike = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please login to like this post');
        return;
      }
      if (uesQ_Post_Like?.data?.data?.isLike) {
        await postService.unlike(postId);
      } else {
        await postService.like(postId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', 'like', postId],
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="p-0 overflow-hidden shadow-xl border-0">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <MyImage
            src={
              PostData?.data?.thumbnail
                ? utils_ApiImageToLocalImage(PostData?.data?.thumbnail)
                : IMAGES.DEFAULT_COURSE
            }
            alt={PostData?.data?.title ?? ''}
            width={1200}
            height={500}
            priority
            defaultSrc={IMAGES.DEFAULT_COURSE.src}
          />

          {/* Navigation & Actions */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
            <Button
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              variant="outline"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              <Button
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.origin + localPath(paths.POSTS + '/' + postId),
                  );
                  toast.success('Copied to clipboard');
                }}
              >
                <IconShare className="w-4 h-4" />
              </Button>

              <Button
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                variant="outline"
                size="icon"
                onClick={() => mutationLike.mutate()}
              >
                {uesQ_Post_Like?.data?.data?.isLike ? (
                  <IconBookmarkFilled className="w-4 h-4" />
                ) : (
                  <IconBookmark className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="max-w-4xl">
              <NameTags tags={PostData?.data?.tags ?? []} className="mb-4 opacity-90" max={3} />
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                {PostData?.data?.title}
              </h1>
            </div>
          </div>
        </div>
      </Card>

      {/* Author & Metadata */}
      <Card className="p-10 shadow-lg border-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <MyImage
                className="w-16 h-16 object-cover rounded-full ring-4 ring-blue-100 shadow-md"
                src={
                  PostData?.data?.author?.avatar
                    ? utils_ApiImageToLocalImage(PostData?.data?.author.avatar)
                    : apiConfig.avatar(PostData?.data?.author?.name ?? 'c')
                }
                alt={PostData?.data?.author?.name || 'Author'}
                width={64}
                height={64}
                defaultSrc={apiConfig.avatar(PostData?.data?.author?.name ?? 'c')}
              />
            </div>
            <div>
              <TextHeading className="text-xl">{PostData?.data?.author?.name}</TextHeading>
              {PostData?.data?.createdAt && (
                <TextDescription className="text-sm">
                  {utils_DateToDDMonth(new Date(PostData?.data?.createdAt))} •{' '}
                  {utils_TimeAgo(new Date(PostData?.data?.createdAt))}
                </TextDescription>
              )}
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <HeartIcon className="w-4 h-4" />
              <span>{PostData?.data?.likeCount ?? 0} likes</span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-blue max-w-none">
          <SwapperHTML content={PostData?.data?.content ?? ''} />
        </div>

        <Comments
          onSubmit={value => mutationComment.mutate(value)}
          comments={commentData?.data ?? []}
        />
      </Card>
    </div>
  );
}
