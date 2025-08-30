import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';
import useQ_Repos_GetFramework from '@/hooks/query-hooks/Repos/useQ_Repos_GetFramework';
import { Code } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LanguageChart({ courseId }: { courseId: string }) {
  const { theme } = useDarkMode();
  const t = useTranslations('dashboard.charts.language');

  const { data: frameworkResponse, isLoading, isError } = useQ_Repos_GetFramework({ id: courseId });

  const frameworkData = frameworkResponse?.data.map(item => ({
    framework: item.framework,
    count: item.count,
  }));

  const colors = [
    '#3b82f6', // Blue
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#f97316', // Orange
    '#ec4899', // Pink
    '#84cc16', // Lime
    '#6366f1', // Indigo
  ];

  const chartOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
      formatter: function (params: { name: string; value: number }[]) {
        const data = params[0];
        return `${data.name}: ${data.value}`;
      },
    },
    legend: {
      data: ['Ngôn ngữ lập trình', 'Thư viện/Framework'],
      textStyle: { color: theme.textColor },
      bottom: 'bottom',
    },
    xAxis: {
      type: 'category',
      data: frameworkData?.map(item => item.framework),
      axisLabel: {
        color: theme.textColor,
        interval: 0,
        rotate: 45,
        fontSize: 12,
        margin: 15,
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: { color: theme.splitLineColor },
      },
      axisLine: {
        show: true,
        lineStyle: { color: theme.splitLineColor },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: theme.textColor,
        formatter: '{value}',
        fontSize: 12,
        margin: 10,
      },
      axisTick: {
        show: true,
        lineStyle: { color: theme.splitLineColor },
      },
      axisLine: {
        show: true,
        lineStyle: { color: theme.splitLineColor },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: theme.splitLineColor,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Số lượng đề tài',
        type: 'bar',
        data: frameworkData?.map((item, index) => ({
          value: item.count,
          itemStyle: {
            color: colors[index % colors.length],
          },
        })),
        barWidth: '60%',
        label: {
          show: true,
          position: 'top',
          color: theme.textColor,
          fontSize: 12,
        },
      },
    ],
  };

  if (isError) return <div>Error</div>;

  return (
    <ChartWrapper
      icon={<Code className="w-5 h-5" />}
      label={t('title')}
      description={t('description')}
      option={chartOptions}
      isLoading={isLoading}
    />
  );
}
