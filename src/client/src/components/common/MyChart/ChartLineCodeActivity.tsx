import MySelect from '@/components/common/MySelect';
import { useDarkMode } from '@/hooks';
import { TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ICodeActivity } from '@/interfaces/course';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { ChartWrapper } from '../ChartWrapper';

interface ChartLineCodeActivityProps {
  data?: ICodeActivity;
  setSelectedDays: (value: number) => void;
  selectedDays: number;
  isLoading?: boolean;
}

/**
 * Component trả về lượng Commit, Pull Request, Code Analysis theo thời gian
 * @param data: dữ liệu về lượng Commit, Pull Request, Code Analysis
 * @param setSelectedDays: hàm để chọn thời gian
 * @param selectedDays: thời gian đã chọn
 * @param isLoading: trạng thái loading
 * @returns
 */
export default function ChartLineCodeActivity({
  data,
  setSelectedDays,
  selectedDays,
  isLoading = false,
}: ChartLineCodeActivityProps) {
  const { theme } = useDarkMode();
  const t = useTranslations('dashboard.charts.codeActivity');

  const codeActivity = data;

  const timeFilterOptions = [
    { label: t('7d'), value: 7 },
    { label: t('30d'), value: 30 },
    { label: t('3m'), value: 90 },
    { label: t('6m'), value: 180 },
    { label: t('1y'), value: 365 },
  ];

  const codeActivityOptions = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
      formatter: function (
        params: Array<{ axisValue: string; seriesName: string; value: number; color: string }>,
      ) {
        let result = `<div style="font-weight: 600;">${params[0].axisValue}</div>`;
        params.forEach(param => {
          result += `<div style="margin: 4px 0;"><span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${param.color}; margin-right: 8px;"></span>${param.seriesName}: ${param.value}</div>`;
        });
        return result;
      },
    },
    legend: {
      data: ['Commits', 'Pull Requests', 'Code Analysis'],
      textStyle: { color: theme.textColor },
    },
    xAxis: {
      type: 'category',
      data: codeActivity?.activities?.map(item => `${utils_DateToDDMMYYYY(item.date)}`),
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
      axisLabel: {
        color: theme.textColor,
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
        },
      },
    },
    series: [
      {
        name: 'Commits',
        data: codeActivity?.activities?.map(item => item.commits),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
              { offset: 1, color: 'rgba(139, 92, 246, 0.1)' },
            ],
          },
        },
        lineStyle: { color: '#8b5cf6', width: 3 },
        itemStyle: { color: '#8b5cf6' },
        symbolSize: 6,
      },
      {
        name: 'Pull Requests',
        data: codeActivity?.activities?.map(item => item.pullRequests),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.1)' },
            ],
          },
        },
        lineStyle: { color: '#10b981', width: 3 },
        itemStyle: { color: '#10b981' },
        symbolSize: 6,
      },
      {
        name: 'Code Analysis',
        data: codeActivity?.activities?.map(item => item.codeAnalysis),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
              { offset: 1, color: 'rgba(245, 158, 11, 0.1)' },
            ],
          },
        },
        lineStyle: { color: '#f59e0b', width: 3 },
        itemStyle: { color: '#f59e0b' },
        symbolSize: 6,
      },
    ],
  };

  return (
    <ChartWrapper
      icon={<TrendingUp className="w-5 h-5" />}
      label={t('title')}
      option={codeActivityOptions}
      isLoading={isLoading}
      // isEmpty={codeActivity?.activities?.length === 0}
      rightComponent={
        <MySelect
          options={[
            ...(timeFilterOptions.map(option => {
              return {
                labelKey: option.label,
                value: option.value.toString(),
              };
            }) ?? []),
          ]}
          size="sm"
          defaultValue={selectedDays.toString()}
          name="selectedDays"
          className="min-w-[120px]"
          isTranslate={false}
          onChange={value => setSelectedDays(Number(value))}
        />
      }
    />
  );
}
