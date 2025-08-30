import { Badge } from '@/components/ui/badge';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading from '@/components/ui/text';
import { ICommit, IRepos } from '@/interfaces/repos';
import { util_format_number_compact } from '@/utils/common';
import { utils_DateToDDMMYYYY_HHMM } from '@/utils/date';
import { IconExternalLink, IconGitBranch, IconGitCommit } from '@tabler/icons-react';

export default function CommitItem({ commit, repos }: { commit: ICommit; repos: IRepos }) {
  const handleOpenCommit = () => {
    if (repos.url) {
      window.open(`${repos.url}/commit/${commit.commitSha}`, '_blank');
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow flex flex-row justify-between items-center">
      <div className="flex flex-col gap-4 mb-0">
        <div className="flex items-start gap-3">
          <IconGitCommit className="size-4 text-muted-foreground" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TextHeading
                lineClamp={1}
                className="font-semibold cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={handleOpenCommit}
              >
                {commit.message}
                <IconExternalLink className="size-3 opacity-60" onClick={handleOpenCommit} />
              </TextHeading>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MemberAvatar
              name={commit?.author?.name || ''}
              avatar={commit?.author?.avatar}
              size={26}
              id={commit?.author?.id}
            />
          </div>

          {commit?.branch && (
            <div className="flex items-center gap-1">
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-1 py-0.5 rounded-sm bg-amber-600/10 dark:bg-amber-600/20"
              >
                <IconGitBranch className="size-4 text-amber-500" />
                <span className="text-amber-500">{commit?.branch}</span>
              </Badge>
            </div>
          )}

          <span>{utils_DateToDDMMYYYY_HHMM(commit?.createdAt || new Date())}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          <span className="text-green-600">
            +{util_format_number_compact(commit?.additions ?? 0)}
          </span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-red-500">
            -{util_format_number_compact(commit?.deletions ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
