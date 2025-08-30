import MyBadge from '@/components/common/MyBadge';
import { Badge } from '@/components/ui/badge';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading from '@/components/ui/text';
import { STATUS_CODE_ANLYSIS } from '@/constants/object';
import { ICodeAnalysis } from '@/interfaces/code_analysis';
import { IRepos } from '@/interfaces/repos';
import { util_object_to_color } from '@/utils/common';
import { utils_DateToDDMMYYYY_HHMM } from '@/utils/date';
import { IconExternalLink, IconGitBranch, IconGitCommit } from '@tabler/icons-react';
import CodeAnalysisModal from './CodeAnalysisModal';
import { MetricItem } from './MetricItem';
import { ENUM_METRICS_CODE_ANALYSIS } from '@/constants/enum';

interface CodeAnalysisItemProps {
  data: ICodeAnalysis;
  repos: IRepos;
}

export default function CodeAnalysisItem({ data, repos }: CodeAnalysisItemProps) {
  const { id, branch, commitSha, status, analyzedAt, workflowRunId, author, metrics } = data;

  const getStatusConfig = (status: string) => {
    const statusGet = util_object_to_color(
      STATUS_CODE_ANLYSIS.find(item => item.value === status)!,
    );

    return statusGet;
  };

  const handleOpenGitHub = () => {
    if (workflowRunId && repos.url) {
      window.open(`${repos.url}/actions/runs/${workflowRunId}`, '_blank');
    }
  };

  const handleOpenCommit = () => {
    if (repos.url) {
      window.open(`${repos.url}/commit/${commitSha}`, '_blank');
    }
  };

  const isAnalysisCompleted = () => {
    return ['completed', 'success'].includes(status.toLowerCase());
  };

  const getFilteredAndSortedMetrics = () => {
    if (!metrics?.length) return [];

    // Lấy thứ tự từ ENUM_METRICS_CODE_ANALYSIS
    const enumOrder = Object.values(ENUM_METRICS_CODE_ANALYSIS);

    return metrics
      .sort((a, b) => {
        const indexA = enumOrder.indexOf(a.name as ENUM_METRICS_CODE_ANALYSIS);
        const indexB = enumOrder.indexOf(b.name as ENUM_METRICS_CODE_ANALYSIS);
        return indexA - indexB;
      })
      .slice(0, 5); // Lấy 5 cái đầu
  };

  const sortedMetrics = getFilteredAndSortedMetrics();
  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <StatusIcon className={`size-4 mt-1 ${statusConfig.text}`} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TextHeading
                className="font-semibold cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={handleOpenGitHub}
              >
                Code Analysis #{id.slice(-8)}...
                <IconExternalLink className="size-3 opacity-60" />
              </TextHeading>
              <MyBadge
                className="w-fit"
                status={STATUS_CODE_ANLYSIS.find(item => item.value === status)!}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {isAnalysisCompleted() && <CodeAnalysisModal metrics={metrics} codeAnalysis={data} />}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {author && (
          <div className="flex items-center gap-1">
            <MemberAvatar
              name={author.name || ''}
              avatar={author.avatar}
              size={30}
              id={author.id}
            />
          </div>
        )}

        <div className="flex items-center gap-1">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-1 py-0.5 rounded-sm bg-amber-600/10 dark:bg-amber-600/20"
          >
            <IconGitBranch className="size-4 text-amber-500" />
            <span className="text-amber-500">{branch}</span>
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          <IconGitCommit className="size-4" />
          <span
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleOpenCommit}
          >
            {commitSha.slice(0, 7)}...
          </span>
        </div>

        <span>{utils_DateToDDMMYYYY_HHMM(analyzedAt)}</span>
      </div>

      {/* Metrics Section */}
      {sortedMetrics.length > 0 && status === 'success' && (
        <div className="border-t pt-3">
          <div className="flex items-start gap-6 text-sm">
            {sortedMetrics.map(metric => (
              <MetricItem key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
