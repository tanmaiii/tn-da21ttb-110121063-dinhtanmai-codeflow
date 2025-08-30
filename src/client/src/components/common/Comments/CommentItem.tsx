import TextHeading, { TextDescription } from '@/components/ui/text';
import { IconMessage2, IconPointFilled } from '@tabler/icons-react';
import CardPost_Button from '../CardPost/CardPostButton';
import CommentInput from './CommentInput';
import { useState } from 'react';
import { IComment } from '@/interfaces/comment';
import { cx } from 'class-variance-authority';
import { utils_TimeAgo } from '../../../utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import commentService from '@/services/comment.service';
import { util_length_comment } from '@/utils/common';
import { useTranslations } from 'next-intl';
import Comment_More from './CommentMore';
import { useUserStore } from '@/stores/user_store';
import apiConfig from '@/lib/api';
import MyImage from '../MyImage';

interface CommentItemProps {
  comment?: IComment;
}

function flattenComments(comments: IComment[]) {
  const flat: IComment[] = [];

  function traverse(commentList: IComment[]) {
    commentList.forEach(comment => {
      const { replies, ...rest } = comment;
      flat.push({ ...rest, replies: [] }); // đẩy comment cha KHÔNG kèm replies

      if (replies && replies.length > 0) {
        traverse(replies);
      }
    });
  }

  traverse(comments);

  return flat;
}

const MAX_VISIBLE_COMMENTS = 1;

export default function CommentItem({ comment }: CommentItemProps) {
  const [reply, setReply] = useState<boolean>(false);
  const t = useTranslations('comment');
  const [update, setUpdate] = useState<boolean>(false);
  const [visibleReplies, setVisibleReplies] = useState<number>(MAX_VISIBLE_COMMENTS);
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const mutionSubmit = useMutation({
    mutationFn: (value: string) => {
      if (!update) {
        return commentService.create({
          content: value,
          postId: comment?.postId,
          courseId: comment?.courseId,
          parentId: comment?.id,
        });
      } else if (comment?.id) {
        return commentService.update(comment.id, {
          content: value,
        });
      }
      throw new Error('Cannot update comment: missing comment ID');
    },
    onSuccess: () => {
      setReply(false);
      setUpdate(false);
      queryClient.invalidateQueries({
        queryKey: ['post', 'comments', comment?.postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['course', 'comments', comment?.courseId],
      });
    },
  });

  const mutionDelete = useMutation({
    mutationFn: async () => {
      if (!comment?.id) throw new Error('Cannot delete comment: missing comment ID');
      return commentService.delete(comment.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', 'comments', comment?.postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['course', 'comments', comment?.courseId],
      });
    },
  });

  const handleLoadMoreReplies = () => {
    setVisibleReplies(prev => prev + MAX_VISIBLE_COMMENTS);
  };

  const visibleRepliesList = comment?.replies ? flattenComments(comment.replies || []) : [];

  const flatComments = comment?.replies ? visibleRepliesList.slice(0, visibleReplies) : [];

  return (
    <div
      className={cx('flex flex-col w-full rounded-lg', {
        border: !comment?.parentId,
      })}
    >
      {!update ? (
        <div
          className={cx('p-3 relative rounded-lg hover:bg-input/20', {
            'border-b': !comment?.parentId && comment?.replies && comment?.replies.length > 0,
          })}
        >
          <header className="flex z-3 flex-row justify-start items-center gap-2">
            <div className="w-10 h-10 min-h-10 min-w-10 z-2 relative">
              <MyImage
                src={comment?.author?.avatar ?? apiConfig.avatar(comment?.author?.name ?? 'c')}
                alt="logo"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-lg"
                defaultSrc={apiConfig.avatar(comment?.author?.name ?? 'c')}
              />
            </div>
            <div className="flex items-center gap-2">
              <TextHeading>{comment?.author?.name}</TextHeading>
              <IconPointFilled size={12} />
              <TextDescription>{utils_TimeAgo(new Date(comment?.createdAt ?? ''))}</TextDescription>
            </div>
          </header>

          <div className={cx('mt-1 ' + (comment?.parentId ? 'ml-12' : ''))}>
            <TextHeading className="text-md font-normal">{comment?.content}</TextHeading>

            <div className="flex flex-row items-center gap-2 mt-2">
              <CardPost_Button
                onClick={() => setReply(!reply)}
                icon={<IconMessage2 size={24} />}
                value={
                  comment?.replies && comment?.replies.length > 0
                    ? util_length_comment(comment?.replies).toString()
                    : ''
                }
              />
              <Comment_More
                onUpdate={user?.id === comment?.author?.id ? () => setUpdate(true) : undefined}
                onDelete={
                  user?.id === comment?.author?.id ? () => mutionDelete.mutate() : undefined
                }
              />
            </div>
          </div>

          {comment?.parentId && (
            <div className="absolute bottom-0 left-8 top-0 z-1 -ml-px w-0.5 bg-border"></div>
          )}
        </div>
      ) : (
        <CommentInput
          onSubmit={value => mutionSubmit.mutate(value)}
          turnOff={() => {
            setUpdate(false);
          }}
          value={comment?.content}
        />
      )}

      {reply && (
        <CommentInput
          onSubmit={comment => mutionSubmit.mutate(comment)}
          commentReply={comment}
          turnOff={() => {
            setReply(false);
          }}
        />
      )}

      {comment?.replies && (
        <div className="flex flex-col">
          {flatComments.map(reply => (
            <CommentItem key={reply.id} comment={reply} />
          ))}

          {visibleReplies < visibleRepliesList.length && (
            <button
              onClick={handleLoadMoreReplies}
              className="self-start text-sm text-primary hover:underline mt-2 ml-12"
            >
              {t('seeMoreReplys', {
                length: visibleRepliesList.length - visibleReplies,
              })}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
