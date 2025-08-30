import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';
import { IReposFramework } from '@/interfaces/repos';
import { Code } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ChartPieLanguageProps {
  framework: IReposFramework[];
  isLoading: boolean;
}

/**
 * Component hiển thị biểu đồ pie cho ngôn ngữ, thư viện
 * @param framework: danh sách framework
 * @param isLoading: trạng thái loading
 * @returns biểu đồ pie cho ngôn ngữ, thư viện
 */
export default function ChartPieLanguage({ framework, isLoading }: ChartPieLanguageProps) {
  const { theme } = useDarkMode();
  const t = useTranslations('dashboard.charts.language');

  const projectTypes = framework.map(item => ({
    name: item.framework,
    value: item.count,
  }));

  // Số lượng commit theo thời gian
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
        name: t('title'),
        type: 'pie',
        radius: ['30%', '65%'],
        center: ['35%', '50%'],
        data: projectTypes,
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
      icon={<Code className="w-5 h-5" />}
      label={t('title')}
      description={t('description')}
      option={Option}
      // isEmpty={projectTypes.length === 0}
      isLoading={isLoading}
    />
  );
}
