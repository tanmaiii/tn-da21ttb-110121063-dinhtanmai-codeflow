import { useDarkMode } from '@/hooks';
import { ITopicStatus } from '@/interfaces/topic';
import { ChartWrapper } from '../ChartWrapper';
import { useTranslations } from 'next-intl';
import { FileText } from 'lucide-react';

interface ChartTopicStatusProps {
  data?: ITopicStatus;
  isLoading: boolean;
}

/**
 * Trả về trạng thái đề tài của khóa học
 * @param data: dữ liệu trạng thái đề tài
 * @param isLoading: trạng thái loading
 * @returns: trạng thái đề tài của khóa học
 */
export default function ChartTopicStatus({ data, isLoading = false }: ChartTopicStatusProps) {
  const { theme } = useDarkMode();
  const t = useTranslations('dashboard.charts.topicApproval');

  const options = {
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
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: [t('teacher'), t('self')],
      textStyle: { color: theme.textColor },
      top: 'top',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: [t('pending'), t('approved'), t('rejected')],
      axisLabel: {
        color: theme.textColor,
      },
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: theme.textColor,
      },
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
      splitLine: {
        lineStyle: {
          color: theme.splitLineColor,
          opacity: 0.3,
        },
      },
    },
    series: [
      {
        name: t('teacher'),
        type: 'bar',
        data: [data?.pending.system, data?.approved.system, data?.rejected.system],
        itemStyle: {
          color: '#8b5cf6', // Purple
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      {
        name: t('self'),
        type: 'bar',
        data: [data?.pending.custom, data?.approved.custom, data?.rejected.custom],
        itemStyle: {
          color: '#f97316', // Orange
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ChartWrapper
      icon={<FileText className="w-5 h-5" />}
      label={t('title')}
      description={t('description')}
      option={options}
      isLoading={isLoading}
    />
  );
}
