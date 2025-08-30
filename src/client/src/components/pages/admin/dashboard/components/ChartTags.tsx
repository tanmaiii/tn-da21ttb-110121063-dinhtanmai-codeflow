import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';
import { ITagWithUsageCount } from '@/interfaces/tags';
import { IconTag } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export default function ChartTags({
  tags,
  isLoading,
}: {
  tags: ITagWithUsageCount[];
  isLoading: boolean;
}) {
  const { theme } = useDarkMode();
  const t = useTranslations('dashboard.charts.tags');

  const tagsData = tags
    .map(tag => ({
      name: tag.name,
      khoaHoc: tag.coursesCount,
      baiViet: tag.postsCount,
      totalUsage: tag.coursesCount + tag.postsCount,
    }))
    ?.filter(tag => tag.totalUsage > 0)
    .sort((a, b) => b.totalUsage - a.totalUsage);

  const Option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: { axisValue: string; seriesName: string; value: number }[]) => {
        let result = `<div style="font-weight: bold;">${params[0].axisValue}</div>`;
        params.forEach(param => {
          result += `<div>${param.seriesName}: ${param.value}</div>`;
        });
        return result;
      },
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
    },
    legend: {
      data: [t('courses'), t('posts')],
      textStyle: {
        color: theme.textColor,
      },
      top: 30,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: tagsData.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
      axisLabel: {
        color: theme.textColor,
        rotate: 45,
        fontSize: 10,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `${value}`,
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
        },
      },
    },
    series: [
      {
        name: t('courses'),
        type: 'bar',
        data: tagsData.map(item => item.khoaHoc),
        itemStyle: {
          color: '#10b981',
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: '#059669',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(16, 185, 129, 0.5)',
          },
        },
      },
      {
        name: t('posts'),
        type: 'bar',
        data: tagsData.map(item => item.baiViet),
        itemStyle: {
          color: '#3b82f6',
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: '#2563eb',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(59, 130, 246, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ChartWrapper
      label={t('title')}
      icon={<IconTag className="w-5 h-5" />}
      isLoading={isLoading}
      option={Option}
    />
  );
}
