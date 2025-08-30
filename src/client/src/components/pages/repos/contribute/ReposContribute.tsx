import { MemberContributeCard } from '@/components/common/MemberContributeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useQ_Repos_GetContributors from '@/hooks/query-hooks/Repos/useQ_Repos_Contributors';
import { IRepos } from '@/interfaces/repos';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ReposContribute({ repos }: { repos: IRepos }) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: contributors } = useQ_Repos_GetContributors({
    id: repos.id,
  });

  const displayedContributors = contributors?.data || [];
  const initialCount = 3;
  const visibleContributors = isExpanded
    ? displayedContributors
    : displayedContributors.slice(0, initialCount);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t('repos.contribute')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleContributors.map(contributor => (
          <MemberContributeCard key={contributor.authorId} contributor={contributor} />
        ))}

        {displayedContributors.length > initialCount && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 w-full text-sm text-blue-600 hover:text-blue-700 transition-colors py-2 border-t border-gray-100 dark:border-gray-800 bg-transparent"
          >
            {isExpanded
              ? `Show less`
              : `View ${displayedContributors.length - initialCount} more contributors`}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
