import CardRepo from '@/components/common/CardRepo';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import useQ_Repos_GetAllByTopic from '@/hooks/query-hooks/Repos/useQ_Repos_GetAllByTopic';
import { ITopic } from '@/interfaces/topic';
import { IconGitBranch } from '@tabler/icons-react';
import { Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TopicsReposCreate from './TopicsReposCreate';
import { useUserStore } from '@/stores/user_store';
import { ENUM_STATUS_TOPIC } from '@/constants/enum';

export default function TopicsRepos({ topic }: { topic: ITopic }) {
  const MAX_REPOS = 3;
  const t = useTranslations('topic');
  const { data: Q_Repos, isLoading } = useQ_Repos_GetAllByTopic({
    params: {
      page: 1,
      limit: 10,
    },
    topicId: topic.id,
  });
  const { user } = useUserStore();
  const isMember = topic.members?.some(member => member.userId === user?.id);
  const canAddRepo = isMember && Q_Repos?.pagination && Q_Repos.pagination.totalItems < MAX_REPOS;

  if (isLoading) return '...loading';

  return (
    <Card className="p-3 md:p-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-slate-600 to-zinc-700 shadow-sm">
            <Github className="w-6 h-6 text-white" />
          </div>
          <div>
            <TextHeading className="text-lg/4 font-bold">{t('repository')}</TextHeading>
          </div>

          {canAddRepo && topic.status == ENUM_STATUS_TOPIC.APPROVED && (
            <div className="ml-auto">
              <TopicsReposCreate topicId={topic.id} />
            </div>
          )}
        </div>
        {Q_Repos?.data?.length && Q_Repos?.data?.length > 0 ? (
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              {Q_Repos?.data.map(repos => (
                <div
                  key={repos.id}
                  className="transform transition-all duration-200 hover:scale-[1.02]"
                >
                  <CardRepo repos={repos} />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-800/50 dark:to-zinc-700/50 rounded-lg border border-zinc-200/50 dark:border-zinc-600/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <IconGitBranch className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {Q_Repos?.data.length} / {MAX_REPOS} {t('repositories')}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {MAX_REPOS - Q_Repos?.data.length} {t('remaining')}
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Github className="w-8 h-8 text-zinc-400" />
            </div>
            <TextDescription className="text-center text-zinc-500 dark:text-zinc-400">
              {topic.status != ENUM_STATUS_TOPIC.APPROVED
                ?  t('waitingForApproval')
                : t('emptyRepositories')}
            </TextDescription>
          </div>
        )}
      </div>
    </Card>
  );
}
