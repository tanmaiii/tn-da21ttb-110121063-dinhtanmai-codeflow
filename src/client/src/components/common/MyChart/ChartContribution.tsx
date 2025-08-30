import TextHeading from '@/components/ui/text';
import { useDarkMode } from '@/hooks';
import { IMemberContributors } from '@/interfaces/user';
import ReactECharts from 'echarts-for-react';
import { ChartArea } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ChartContribution({
  contributors,
}: {
  contributors: IMemberContributors[];
}) {
  const { theme } = useDarkMode();
  const t = useTranslations('codeContribution');

  const contributorNames = contributors?.map(c => c?.author?.name) || [];
  const commitsData = contributors?.map(c => c.commit.total) || [];
  const pullRequestsData = contributors?.map(c => c.pullRequest.total) || [];
  const codeAnalysisData = contributors?.map(c => c.codeAnalysis.total) || [];

  const option = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: (
        params: Array<{ axisValue: string; marker: string; seriesName: string; value: number }>,
      ) =>
        `<strong>${params[0].axisValue}</strong><br/>${params
          .map(p => `${p.marker} ${p.seriesName}: ${p.value}`)
          .join('<br/>')}`,
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
      extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
    },
    legend: {
      top: 'top',
      data: ['Commits', 'Pull Requests', 'Code Analysis'],
      textStyle: { fontSize: 12, color: theme.textColor },
      itemGap: 20,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: contributorNames,
      axisLabel: {
        color: theme.textColor,
        fontSize: 11,
        rotate: contributorNames.length > 6 ? 45 : 0,
        interval: 0,
      },
      axisLine: {
        lineStyle: { color: theme.axisLineColor },
      },
    },
    yAxis: {
      type: 'value',
      name: t('count'),
      nameTextStyle: { color: theme.textColor },
      axisLabel: { color: theme.textColor },
      axisLine: {
        lineStyle: { color: theme.axisLineColor },
      },
      splitLine: {
        lineStyle: {
          color: theme.splitLineColor,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Commits',
        type: 'bar',
        emphasis: { focus: 'series' },
        itemStyle: {
          color: '#3b82f6',
          borderRadius: [4, 4, 0, 0],
        },
        data: commitsData,
      },
      {
        name: 'Pull Requests',
        type: 'bar',
        emphasis: { focus: 'series' },
        itemStyle: {
          color: '#8b5cf6',
          borderRadius: [4, 4, 0, 0],
        },
        data: pullRequestsData,
      },
      {
        name: 'Code Analysis',
        type: 'bar',
        emphasis: { focus: 'series' },
        itemStyle: {
          color: '#06b6d4',
          borderRadius: [4, 4, 0, 0],
        },
        data: codeAnalysisData,
      },
    ],
  };

  return (
    <div className="gap-0 border rounded-lg p-4">
      <TextHeading className="text-lg">{t('memberContributionOverview')}</TextHeading>
      <div>
        {contributors?.length <= 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            <ChartArea className="w-12 h-12 text-zinc-400" />
            <p className="text-md opacity-50 font-medium mt-2 text-center">{t('noData')}</p>
          </div>
        ) : (
          <ReactECharts option={option} style={{ height: '400px' }} opts={{ renderer: 'svg' }} />
        )}
      </div>
    </div>
  );
}
