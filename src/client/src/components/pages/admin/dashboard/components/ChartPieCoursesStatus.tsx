import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';
import { ICourseStatus } from '@/interfaces/course';
import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ChartPieCoursesStatus({
  data,
  isLoading = false,
}: {
  data?: ICourseStatus;
  isLoading: boolean;
}) {
  const { theme } = useDarkMode();
  const t_dashboard = useTranslations('dashboard.charts.courseStatus');

  const chartOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
      formatter: '{b}: {c}',
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      textStyle: { color: theme.textColor },
    },
    series: [
      {
        name: t_dashboard('title'),
        type: 'pie',
        radius: '60%',
        center: ['50%', '45%'],
        data: [
          { name: t_dashboard('registration'), value: data?.registration },
          { name: t_dashboard('active'), value: data?.active },
          { name: t_dashboard('ended'), value: data?.ended },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true,
          formatter: '{b}: {c}',
          color: theme.textColor,
        },
      },
    ],
  };

  return (
    <ChartWrapper
      label={t_dashboard('title')}
      description={t_dashboard('description')}
      icon={<Clock className="w-5 h-5" />}
      isLoading={isLoading}
      option={chartOptions}
    />
  );
}
