'use client';
import { Card, CardContent } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import useQ_Post_CheckLike from '@/hooks/query-hooks/Post/useQ_Post_CheckLike';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { IPost } from '@/interfaces/post';
import apiConfig from '@/lib/api';
import postService from '@/services/post.service';
import { useUserStore } from '@/stores/user_store';
import { util_format_number } from '@/utils/common';
import { utils_DateToDDMonth, utils_TimeAgo } from '@/utils/date';
import {
  IconArrowBigUpLine,
  IconArrowBigUpLineFilled,
  IconLink,
  IconMessage2,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { utils_ApiImageToLocalImage } from '../../../utils/image';
import MyImage from '../MyImage';
import NameTags from '../NameTags/NameTags';
import Tooltip from '../Tooltip/Tooltip';
import CardPost_Button from './CardPostButton';
import CardPost_More from './CardPostMore';

interface CardPostProps {
  post: IPost;
}

export default function CardPost({ post }: CardPostProps) {
  const { localPath } = useH_LocalPath();
  const [likeCount, setLikeCount] = useState(post?.likeCount ?? 0);
  const uesQ_Post_Like = useQ_Post_CheckLike({
    id: post.id ?? '',
  });
  const router = useRouter();
  const { user } = useUserStore();

  const mutationLike = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please login to like this post');
        return;
      }
      if (uesQ_Post_Like?.data?.data?.isLike) {
        await postService.unlike(post.id ?? '');
        setLikeCount(likeCount - 1);
      } else {
        await postService.like(post.id ?? '');
        setLikeCount(likeCount + 1);
      }
    },
    onSuccess: () => {
      uesQ_Post_Like.refetch();
    },
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + localPath(paths.POSTS + '/' + post.id));
    toast.success('Copied to clipboard');
  };

  return (
    <Card className="p-2 hover:border-white/30 cursor-pointer bg-background-1 group/item h-full">
      <CardContent className="px-2 h-full flex flex-col justify-between">
        <div className="pt-2 mb-auto">
          <div className="flex items-center justify-between">
            <Link href={`${localPath(paths.USER_DETAIL(post?.author?.id ?? ''))}`}>
              <Tooltip tooltip={post?.author?.name ?? ''}>
                <MyImage
                  className="w-8 h-8 rounded-full"
                  src={
                    post?.author?.avatar
                      ? post?.author?.avatar
                      : apiConfig.avatar(post?.author?.name ?? 'c')
                  }
                  alt="Google"
                  width={100}
                  height={100}
                  defaultSrc={apiConfig.avatar(post?.author?.name ?? 'c')}
                />
              </Tooltip>
            </Link>
            <CardPost_More className="group-hover/item:opacity-100 opacity-0" post={post} />
          </div>
          <Link href={`${localPath(paths.POSTS + '/' + post.id)}`} className="">
            <TextHeading className="text-color-1 align-left font-bold text-lg mt-2 line-clamp-2 hover:underline ">
              {post.title}
            </TextHeading>
          </Link>
        </div>
        <div>
          <NameTags tags={post?.tags} />
          <div className="flex items-center gap-1">
            <TextDescription className="text-color-2 text-sm">
              {utils_DateToDDMonth(new Date(post.createdAt ?? ''))}
            </TextDescription>
            <Dot className="text-color-2" />
            <TextDescription className="text-color-2 text-sm">
              {utils_TimeAgo(new Date(post.createdAt ?? ''))}
            </TextDescription>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <MyImage
            className="w-full h-[160px] object-cover rounded-md bg-background-1"
            src={utils_ApiImageToLocalImage(post.thumbnail)}
            alt="Google"
            width={140}
            height={140}
            defaultSrc={IMAGES.DEFAULT_COURSE.src}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <CardPost_Button
            icon={
              uesQ_Post_Like?.data?.data?.isLike ? (
                <IconArrowBigUpLineFilled size={24} className="text-primary" />
              ) : (
                <IconArrowBigUpLine size={24} />
              )
            }
            onClick={mutationLike.mutate}
            value={util_format_number(likeCount, 99)}
          />
          <CardPost_Button
            icon={<IconMessage2 size={24} />}
            value={post?.commentCount.toString() ?? '0'}
            onClick={() => router.push(localPath(paths.POSTS + '/' + post.id))}
          />
          <CardPost_Button icon={<IconLink size={24} />} onClick={handleCopyLink} />
        </div>
      </CardContent>
    </Card>
  );
}
