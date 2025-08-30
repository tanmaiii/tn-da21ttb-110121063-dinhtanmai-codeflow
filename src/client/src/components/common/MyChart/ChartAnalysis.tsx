import TextHeading from '@/components/ui/text';
import { useDarkMode } from '@/hooks';
import { IMemberContributors } from '@/interfaces/user';
import ReactECharts from 'echarts-for-react';
import { ChartArea } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ChartAnalysis({ contributors }: { contributors: IMemberContributors[] }) {
  const { theme } = useDarkMode();
  const t = useTranslations('codeContribution');

  const contributorNames = contributors?.map(c => c?.author?.name ?? 'Unknown') || [];
  const successData = contributors?.map(c => c.codeAnalysis.success) || [];
  const failureData = contributors?.map(c => c.codeAnalysis.failure) || [];

  const option = {
    textStyle: { fontSize: 16, fontFamily: 'Inter, sans-serif', color: theme.textColor },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (
        params: Array<{ axisValue: string; marker: string; seriesName: string; value: number }>,
      ) =>
        `<strong>${params[0].axisValue}</strong><br/>${params
          .map(p => `${p.marker} ${p.seriesName}: ${p.value} lần`)
          .join('<br/>')}`,
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
      extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
    },
    legend: {
      top: 'bottom',
      data: [t('success'), t('failure')],
      textStyle: { fontSize: 12, color: theme.textColor },
    },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: { type: 'category', data: contributorNames },
    yAxis: { type: 'value', name: '', textStyle: { fontSize: 12, color: theme.textColor } },
    series: [
      {
        name: t('success'),
        type: 'bar',
        stack: 'codeAnalysis',
        emphasis: { focus: 'series' },
        itemStyle: { color: '#10b981' },
        data: successData,
      },
      {
        name: t('failure'),
        type: 'bar',
        stack: 'codeAnalysis',
        emphasis: { focus: 'series' },
        itemStyle: { color: '#ef4444' },
        data: failureData,
      },
    ],
  };

  return (
    <div className="gap-0 border rounded-lg p-4">
      <TextHeading className="text-lg">{t('codeAnalysisResult')}</TextHeading>
      <div>
        {contributors?.length <= 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            {/* <div className="p-6 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4"> */}
            <ChartArea className="w-12 h-12 text-zinc-400" />
            {/* </div> */}
            <p className="text-md opacity-50 font-medium mt-2 text-center">{t('noData')}</p>
          </div>
        ) : (
          <ReactECharts
            option={option}
            style={{ height: '340px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        )}
      </div>
    </div>
  );
}
