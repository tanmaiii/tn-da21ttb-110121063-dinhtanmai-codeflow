import TextHeading from '@/components/ui/text';
import { useDarkMode } from '@/hooks';
import { IMemberContributors } from '@/interfaces/user';
import ReactECharts from 'echarts-for-react';
import { ChartArea } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ChartCodeChanges({
  contributors,
}: {
  contributors: IMemberContributors[];
}) {
  const { theme } = useDarkMode();
  const t = useTranslations('codeContribution');

  const contributorNames = contributors?.map(c => c?.author?.name) || [];
  const additionsData = contributors?.map(c => c.commit.additions || 0) || [];
  const deletionsData = contributors?.map(c => -(c.commit.deletions || 0)) || []; // Negative for downward bars

  const option = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (
        params: Array<{ axisValue: string; marker: string; seriesName: string; value: number }>,
      ) => {
        const additions = params.find(p => p.seriesName === 'Thêm')?.value || 0;
        const deletions = Math.abs(params.find(p => p.seriesName === 'Xóa')?.value || 0);
        return `<strong>${params[0]?.axisValue || ''}</strong><br/>
                <span style="color: #10b981;">+ ${additions} ${t('add')}</span><br/>
                <span style="color: #ef4444;">- ${deletions} ${t('delete')}</span><br/>
                <span style="color: ${theme.textColor};">${t('total')}: ${
          additions + deletions
        }</span>`;
      },
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
      extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
    },
    legend: {
      top: 'top',
      data: [t('add'), t('delete')],
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
      name: t('lineCode'),
      nameTextStyle: { color: theme.textColor },
      axisLabel: {
        color: theme.textColor,
        formatter: (value: number) => Math.abs(value).toString(),
      },
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
        name: t('add'),
        type: 'bar',
        stack: 'total',
        emphasis: { focus: 'series' },
        itemStyle: {
          color: '#10b981',
          borderRadius: [4, 4, 0, 0],
        },
        data: additionsData,
      },
      {
        name: t('delete'),
        type: 'bar',
        stack: 'total',
        emphasis: { focus: 'series' },
        itemStyle: {
          color: '#ef4444',
          borderRadius: [0, 0, 4, 4],
        },
        data: deletionsData,
      },
    ],
  };

  return (
    <div className="gap-0 border rounded-lg p-4">
      <TextHeading className="text-lg">{t('codeChanges')}</TextHeading>
      <div>
        {contributors?.length}
        {contributorNames?.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            <ChartArea className="w-12 h-12 text-zinc-400" />
            <p className="text-md opacity-50 font-medium mt-2 text-center">{t('noData')}</p>
          </div>
        ) : (
          <ReactECharts
            option={option}
            style={{ height: '300px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        )}
      </div>
    </div>
  );
}
