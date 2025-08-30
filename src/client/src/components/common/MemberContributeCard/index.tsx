import MemberAvatar from '@/components/ui/member-avatar';
import { IMemberContributors } from '@/interfaces/user';
import { util_format_number_compact } from '@/utils/common';
import { IconCode } from '@tabler/icons-react';
import { GitCommit, GitPullRequest } from 'lucide-react';

interface MemberContributeProps {
  contributor: IMemberContributors;
  number?: number;
}

export function MemberContributeCard({ contributor, number }: MemberContributeProps) {
  return (
    <div className="border rounded-lg p-3 space-y-3 hover:shadow-md transition-shadow flex flex-row gap-2">
      {number && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
          #{number}
        </div>
      )}
      <div className="flex items-start gap-3 justify-between w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full items-center justify-between gap-2">
            <MemberAvatar
              name={contributor.author?.name || ''}
              avatar={contributor.author?.avatar || ''}
              id={contributor.authorId}
              size={40}
              description={contributor.author?.email}
              className="cursor-pointer flex-shrink-0"
            />
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              <span className="text-green-600 font-semibold">
                +{util_format_number_compact(contributor.commit.additions ?? 0)}
              </span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-red-500 font-semibold">
                -{util_format_number_compact(contributor.commit.deletions ?? 0)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 text-sm">
              <IconCode className="w-4 h-4" />
              <span>{util_format_number_compact(contributor.codeAnalysis.total)} analysis</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <GitCommit className="w-4 h-4" />
              <span>{util_format_number_compact(contributor.commit.total)} commits</span>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <GitPullRequest className="w-4 h-4" />
              <span>{util_format_number_compact(contributor.pullRequest.total)} pull requests</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
