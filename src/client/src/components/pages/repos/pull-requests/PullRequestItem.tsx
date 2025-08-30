import IconLoading from '@/components/common/IconLoading/IconLoading';
import MyBadge from '@/components/common/MyBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading from '@/components/ui/text';
import { STATUS_PULL_REQUEST } from '@/constants/object';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import useQ_Topic_GetDetail from '@/hooks/query-hooks/Topic/useQ_Topic_GetDetail';
import { IPullRequest, IRepos } from '@/interfaces/repos';
import reviews_aiService from '@/services/reviews_ai.service';
import { useUserStore } from '@/stores/user_store';
import { util_format_number_compact } from '@/utils/common';
import { utils_DateToDDMMYYYY_HHMM } from '@/utils/date';
import {
  IconCheck,
  IconClock,
  IconExternalLink,
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconRobot,
  IconX,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PullRequestItem({
  pullRequest,
  repos,
}: {
  pullRequest: IPullRequest;
  repos: IRepos;
}) {
  const [score, setScore] = useState<number | null>(null);
  const t = useTranslations();
  const { user } = useUserStore();

  const Topic = useQ_Topic_GetDetail({ id: repos.topicId });
  const Course = useQ_Course_GetDetail({ id: repos?.courseId });

  const getPRStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <IconClock className="size-4 mt-1 text-blue-500" />;
      case 'merged':
        return <IconCheck className="size-4 mt-1 text-green-500" />;
      case 'closed':
        return <IconX className="size-4 mt-1 text-red-500" />;
      default:
        return <IconGitPullRequest className="size-4 mt-1" />;
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await reviews_aiService.evaluatePullRequestGithub(repos.id, pullRequest.id);
      setScore(res?.data.score);
      return res;
    },
    onSuccess: data => {
      setScore(data?.data.score);
      toast.success(t('repos.reviewSuccess', { score: data?.data.score }));
    },
    onError: error => {
      if (error.message === 'Token limit exceeded') {
        toast.error(t('repos.tokenLimitExceeded'));
      } else {
        toast.error(t('repos.reviewFailed'));
      }
    },
  });

  const handleOpenPull = () => {
    if (repos.url) {
      window.open(`${repos.url}/pull/${pullRequest.pullNumber}`, '_blank');
    }
  };

  const isReviewed =
    Topic.data?.data?.members?.some(member => member.userId === user?.id) ||
    Course.data?.data?.authorId === user?.id;

  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {getPRStatusIcon(pullRequest.status)}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TextHeading
                className="font-semibold cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={handleOpenPull}
              >
                #{pullRequest.pullNumber} {pullRequest.title}
                <IconExternalLink className="size-3 opacity-60" />
              </TextHeading>
              {/* <Badge className={getPRStatusColor(pullRequest.status)}>{pullRequest.status}</Badge> */}
              <MyBadge
                className="w-fit"
                status={STATUS_PULL_REQUEST.find(item => item.value === pullRequest.status)!}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{pullRequest.body}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pullRequest.reviewsAI && pullRequest.reviewsAI.length > 0 && (
            <div
              className="flex items-center gap-1 text-green-600 cursor-pointer hover:text-green-700"
              onClick={handleOpenPull}
            >
              <IconRobot className="size-4" />
              <span className="text-xs">
                {t('repos.reviewed') + ' '}
                {score ||
                  pullRequest.reviewsAI?.sort(
                    (a, b) =>
                      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
                  )[0]?.score ||
                  0}
                /10
              </span>
            </div>
          )}
          <Button
            size="sm"
            variant="outline"
            hidden={!isReviewed}
            onClick={() => {
              mutation.mutate();
            }}
            disabled={mutation.isPending}
            className="text-xs"
          >
            {mutation.isPending ? (
              <div className="flex items-center gap-2">
                <IconLoading className="w-3 h-3" />
                <span>{t('repos.reviewing')}</span>
              </div>
            ) : (
              '🤖 Review'
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          {pullRequest.author && (
            <MemberAvatar
              name={pullRequest.author.name || ''}
              avatar={pullRequest.author.avatar}
              size={26}
              id={pullRequest.author.id}
            />
          )}
        </div>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-1 py-0.5 rounded-sm bg-amber-600/10 dark:bg-amber-600/20"
        >
          <IconGitBranch className="size-4 text-amber-500" />
          <span className="text-amber-500">{pullRequest.headBranch}</span>
        </Badge>
        <div className="flex items-center gap-1">
          <IconGitCommit className="size-4" />
          <span>{pullRequest.commitCount} commits</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600">
            +{util_format_number_compact(pullRequest.additions ?? 0)}
          </span>
          <span className="text-red-600">
            -{util_format_number_compact(pullRequest.deletions ?? 0)}
          </span>
        </div>
        <span>{utils_DateToDDMMYYYY_HHMM(pullRequest.createdAt || new Date())}</span>
      </div>
    </div>
  );
}
