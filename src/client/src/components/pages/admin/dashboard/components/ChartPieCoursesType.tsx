'use client';
import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';
import { ICourseType } from '@/interfaces/course';
import { ChartPie } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ChartPieCoursesType({
  courseTypes,
  isLoading,
}: {
  courseTypes: ICourseType[];
  isLoading: boolean;
}) {
  const { theme } = useDarkMode();
  const t = useTranslations();
  const t_dashboard = useTranslations('dashboard.charts.courseType');

  const courseTypesData = courseTypes.map(courseType => ({
    name: t(`course.type.${courseType.type}`),
    value: courseType.count,
  }));

  const Option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
    },
    legend: {
      orient: 'vertical',
      left: '70%',
      top: '15%',
      itemGap: 8,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
        color: theme.textColor,
      },
    },
    series: [
      {
        name: 'Loại khóa học',
        type: 'pie',
        radius: ['30%', '65%'],
        center: ['35%', '50%'],
        data: courseTypesData,
        padAngle: 3,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 1,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true,
          formatter: '{d}%',
          position: 'inside',
        },
      },
    ],
  };

  return (
    <ChartWrapper
      icon={<ChartPie className="w-5 h-5" />}
      label={t_dashboard('title')}
      description={t_dashboard('description')}
      option={Option}
      // isEmpty={courseTypesData.length === 0}
      isLoading={isLoading}
    />
  );
}
