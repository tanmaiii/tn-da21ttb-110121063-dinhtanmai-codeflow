import TextHeading from '@/components/ui/text';
import { useDarkMode } from '@/hooks';
import { IMemberContributors } from '@/interfaces/user';
import ReactECharts from 'echarts-for-react';
import { ChartArea } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ChartMemberRadar({
  contributors,
}: {
  contributors: IMemberContributors[];
}) {
  const { theme } = useDarkMode();
  const t = useTranslations('codeContribution');

  // Lấy top 5 contributors có đóng góp nhiều nhất
  const topContributors =
    contributors
      ?.sort(
        (a, b) =>
          b.commit.total +
          b.pullRequest.total +
          b.codeAnalysis.total -
          (a.commit.total + a.pullRequest.total + a.codeAnalysis.total),
      )
      .slice(0, 5) || [];

  // Tìm giá trị max cho mỗi tiêu chí để chuẩn hóa
  const maxValues = {
    commits: Math.max(...contributors.map(c => c.commit.total), 1),
    pullRequests: Math.max(...contributors.map(c => c.pullRequest.total), 1),
    codeAnalysis: Math.max(...contributors.map(c => c.codeAnalysis.total), 1),
    additions: Math.max(...contributors.map(c => c.commit.additions || 0), 1),
    successRate: 100, // Percentage
  };

  const radarData = topContributors.map((contributor, index) => {
    const successRate =
      contributor.codeAnalysis.total > 0
        ? (contributor.codeAnalysis.success / contributor.codeAnalysis.total) * 100
        : 0;

    return {
      name: contributor?.author?.name ?? 'Unknown',
      value: [
        (contributor.commit.total / maxValues.commits) * 100,
        (contributor.pullRequest.total / maxValues.pullRequests) * 100,
        (contributor.codeAnalysis.total / maxValues.codeAnalysis) * 100,
        ((contributor.commit.additions || 0) / maxValues.additions) * 100,
        successRate,
      ],
      itemStyle: {
        color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][index % 5],
      },
    };
  });

  const option = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: { data: { name: string; value: number[] }; dataIndex: number }) => {
        const data = params.data;
        const contributor = topContributors[params.dataIndex];
        return `<strong>${data.name}</strong><br/>
                Commits: ${contributor.commit.total}<br/>
                Pull Requests: ${contributor.pullRequest.total}<br/>
                ${t('codeAnalysis')}: ${contributor.codeAnalysis.total}<br/>
                ${t('lineCode')}: ${contributor.commit.additions || 0}<br/>
                ${t('successRate')}: ${Math.round(data.value[4])}%`;
      },
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
      extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
    },
    legend: {
      top: 'bottom',
      data: topContributors.map(c => c?.author?.name ?? 'Unknown'),
      textStyle: { fontSize: 11, color: theme.textColor },
      itemGap: 10,
    },
    radar: {
      indicator: [
        { name: 'Commits', max: 100, color: theme.textColor },
        { name: 'Pull Requests', max: 100, color: theme.textColor },
        { name: 'Code Analysis', max: 100, color: theme.textColor },
        { name: t('lineAdd'), max: 100, color: theme.textColor },
        { name: `${t('successRate')} (%)`, max: 100, color: theme.textColor },
      ],
      shape: 'polygon',
      radius: '65%',
      center: ['50%', '50%'],
      axisName: {
        fontSize: 11,
        color: theme.textColor,
      },
      axisLine: {
        lineStyle: {
          color: theme.splitLineColor,
        },
      },
      splitLine: {
        lineStyle: {
          color: theme.splitLineColor,
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(114, 172, 209, 0.05)', 'rgba(114, 172, 209, 0.1)'],
        },
      },
    },
    series: [
      {
        name: 'Member Performance',
        type: 'radar',
        emphasis: {
          areaStyle: {
            opacity: 0.9,
          },
        },
        data: radarData,
        areaStyle: {
          opacity: 0.1,
        },
        lineStyle: {
          width: 2,
        },
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
  };

  return (
    <div className="gap-0 border rounded-lg p-4">
      <TextHeading className="text-lg">{`${t('memberCapability')}(Top 5)`}</TextHeading>
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
