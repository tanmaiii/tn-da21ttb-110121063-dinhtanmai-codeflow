import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useQ_Repos_Stats from '@/hooks/query-hooks/Repos/useQ_Repos_Stats';
import { IRepos } from '@/interfaces/repos';
import { util_format_number_compact } from '@/utils/common';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useTranslations } from 'next-intl';

export default function RepositoryStats({ repo }: { repo: IRepos }) {
  const t = useTranslations();
  const { data, isLoading } = useQ_Repos_Stats({ id: repo.id });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('repos.reposInfo')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pull Requests</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {data?.data?.pullRequest.total ?? 0} {t('repos.pullRequest_open')}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {data?.data?.pullRequest.closed ?? 0} {t('repos.pullRequest_close')}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {data?.data?.pullRequest.merged ?? 0} {t('repos.pullRequest_merged')}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.totalCommits')}</span>
            <span className="text-sm">
              {isLoading ? (
                <Skeleton className="w-10 h-4" />
              ) : (
                util_format_number_compact(data?.data?.commit.total ?? 0)
              )}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.totalAdditions')}</span>
            <span className="text-sm">
              {isLoading ? (
                <Skeleton className="w-30 h-4" />
              ) : (
                util_format_number_compact(data?.data?.commit?.additions ?? 0)
              )}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.totalDeletions')}</span>
            <span className="text-sm">
              {isLoading ? (
                <Skeleton className="w-30 h-4" />
              ) : (
                util_format_number_compact(data?.data?.commit.deletions ?? 0)
              )}
            </span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.totalCodeAnalysis')}</span>
            <span className="text-sm">
              {isLoading ? (
                <Skeleton className="w-30 h-4" />
              ) : (
                util_format_number_compact(data?.data?.codeAnalysis.total ?? 0)
              )}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.created')}</span>
            <span className="text-sm">
              {isLoading ? (
                <Skeleton className="w-30 h-4" />
              ) : (
                utils_DateToDDMMYYYY(repo.createdAt ?? '')
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
