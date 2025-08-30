import { Button } from '@/components/ui/button';
import TextHeading from '@/components/ui/text';
import { IComment } from '@/interfaces/comment';
import { util_length_comment } from '@/utils/common';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CommentItem from './CommentItem';
import CommnetInputDefault from './CommnetInputDefault';

interface ICommentsProps {
  comments?: IComment[];
  onSubmit: (value: string) => void;
}

const MAX_VISIBLE_COMMENTS = 2;

export default function Comments({ comments, onSubmit }: ICommentsProps) {
  const [visibleCount, setVisibleCount] = useState(MAX_VISIBLE_COMMENTS);
  const t = useTranslations('comment');

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + MAX_VISIBLE_COMMENTS);
  };

  const visibleComments = comments ? comments.slice(0, visibleCount) : [];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
        <TextHeading className="text-lg">{`${t('comments')} (${
          comments && util_length_comment(comments)
        })`}</TextHeading>
      </div>

      <CommnetInputDefault onSubmit={onSubmit} />

      {visibleComments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      {comments && visibleCount < comments.length && (
        <Button variant="text" onClick={handleLoadMore}>
          {t('loadMore')} ({comments.length - visibleCount})
        </Button>
      )}
    </div>
  );
}
