import { MemberContributeCard } from '@/components/common/MemberContributeCard';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import useQ_Topic_Contributors from '@/hooks/query-hooks/Topic/useQ_Topic_Contributors';
import { ITopic } from '@/interfaces/topic';
import { AlertCircle, Loader2, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContributeMembers({ topic }: { topic: ITopic }) {
  const {
    data: contributors,
    isLoading,
    isError,
  } = useQ_Topic_Contributors({
    id: topic.id,
  });
  const t = useTranslations('topic');

  if (isLoading)
    return <Loader2 className="w-6 h-6 text-gray-600 animate-spin dark:text-gray-300" />;

  if (isError) return <AlertCircle className="w-6 h-6 text-gray-600 dark:text-gray-300" />;

  return (
    <Card className="p-4 md:p-8">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <TextHeading className="text-xl/4 font-bold">{t('contributeMembers')}</TextHeading>
          <TextDescription className="text-gray-600 dark:text-gray-300">
            {t('membersDescription')}
          </TextDescription>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {contributors?.data && contributors?.data.length > 0 ? (
          contributors.data.map(contributor => (
            <MemberContributeCard key={contributor.authorId} contributor={contributor} />
          ))
        ) : (
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Users className="w-8 h-8 text-zinc-400" />
            </div>
            <TextDescription className="text-center text-zinc-500 dark:text-zinc-400">
              {t('noContributors')}
            </TextDescription>
          </div>
        )}
      </div>
    </Card>
  );
}
