import TextHeading from '@/components/ui/text';
import { useDarkMode } from '@/hooks';
import { IMemberContributors } from '@/interfaces/user';
import ReactECharts from 'echarts-for-react';
import { ChartArea } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ChartAdditions({ contributors }: { contributors: IMemberContributors[] }) {
  const { theme } = useDarkMode();
  const t = useTranslations('codeContribution');

  const codeContributionOption = {
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '20%',
      containLabel: true,
    },
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'item',
      formatter: `{a} <br/>{b}: {c} ${t('row')} ({d}%)`,
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
      borderWidth: 0,
      borderRadius: 8,
      extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      textStyle: {
        color: theme.textColor,
        fontSize: 12,
      },
      itemGap: 15,
    },
    series: [
      {
        name: t('rowCode'),
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: theme.backgroundColor,
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.textColor,
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: {
          show: false,
        },
        data: contributors?.map(member => ({
          value: member.commit.additions,
          name: member?.author?.name ?? 'Unknown',
        })),
      },
    ],
  };

  return (
    <div className="gap-0 border rounded-lg p-4">
      <TextHeading className="text-lg">{t('codeDistribution')}</TextHeading>
      <div>
        {contributors?.length <= 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            {/* <div className="p-6 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4"> */}
            <ChartArea className="w-12 h-12 text-zinc-400" />
            {/* </div> */}
            <p className="text-md opacity-50 font-medium mt-2 text-center">{t('noData')}</p>
          </div>
        ) : (
          <ReactECharts option={codeContributionOption} opts={{ renderer: 'svg' }} />
        )}
      </div>
    </div>
  );
}
