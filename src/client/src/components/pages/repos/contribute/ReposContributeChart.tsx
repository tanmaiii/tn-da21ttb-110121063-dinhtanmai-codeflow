import ChartAdditions from '@/components/common/MyChart/ChartAdditions';
import ChartAnalysis from '@/components/common/MyChart/ChartAnalysis';
import ChartCodeChanges from '@/components/common/MyChart/ChartCodeChanges';
import ChartContribution from '@/components/common/MyChart/ChartContribution';
import ChartMemberRadar from '@/components/common/MyChart/ChartMemberRadar';
import CodeAnalysisImprovementChart from '@/components/common/MyChart/CodeAnalysisImprovementChart';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQ_CodeAnalysis_GetByReposIdWithTimeFilter } from '@/hooks/query-hooks/CodeAnalysis';
import useQ_Repos_GetContributors from '@/hooks/query-hooks/Repos/useQ_Repos_Contributors';
import { IRepos } from '@/interfaces/repos';
import { IconChartBar, IconChartDots3 } from '@tabler/icons-react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ReposContributeChart({ repos }: { repos: IRepos }) {
  const { data: contributors } = useQ_Repos_GetContributors({
    id: repos.id,
  });
  const t = useTranslations('repos');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const { data: analysisData, isLoading } = useQ_CodeAnalysis_GetByReposIdWithTimeFilter(
    repos?.id,
    selectedTimeframe,
  );

  return (
    <Card>
      <Tabs defaultValue="code-analysis" className="w-full">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code-analysis" className="flex items-center gap-2">
              <IconChartDots3 className="size-4" />
              Code Analysis
            </TabsTrigger>
            <TabsTrigger value="contribute" className="flex items-center gap-2">
              <IconChartBar />
              {t('contribute')}
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="min-h-[300px]">
          <TabsContent value="code-analysis" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="size-4 animate-spin" />
              </div>
            ) : (
              <CodeAnalysisImprovementChart
                analysisData={analysisData?.data ?? []}
                selectedTimeframe={selectedTimeframe}
                setSelectedTimeframe={setSelectedTimeframe}
              />
            )}
          </TabsContent>

          <TabsContent value="contribute" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartCodeChanges contributors={contributors?.data ?? []} />
              <ChartAdditions contributors={contributors?.data ?? []} />
            </div>
            <ChartContribution contributors={contributors?.data ?? []} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartMemberRadar contributors={contributors?.data ?? []} />
              <ChartAnalysis contributors={contributors?.data ?? []} />
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
