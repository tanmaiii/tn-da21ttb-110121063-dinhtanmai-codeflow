import MySelect from '@/components/common/MySelect';
import { CardTitle } from '@/components/ui/card';
import TextHeading from '@/components/ui/text';
import { ENUM_METRICS_CODE_ANALYSIS } from '@/constants/enum';
import { METRICS_CODE_ANALYSIS } from '@/constants/object';
import { useDarkMode } from '@/hooks';
import { ICodeAnalysis } from '@/interfaces/code_analysis';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconMinus, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import ReactECharts from 'echarts-for-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const timeFilters = [
  { label: 'timeFilters.7d', value: '7d' },
  { label: 'timeFilters.30d', value: '30d' },
  { label: 'timeFilters.3m', value: '3m' },
  { label: 'timeFilters.6m', value: '6m' },
  { label: 'timeFilters.1y', value: '1y' },
];


interface CodeAnalysisImprovementChartProps {
  analysisData: ICodeAnalysis[];
  setSelectedTimeframe: (value: string) => void;
  selectedTimeframe: string;
}

/**
 * Component về chất lượng code thay đổi theo thời gian
 * @param analysisData: dữ liệu về chất lượng code
 * @param setSelectedTimeframe: hàm để chọn thời gian
 * @param selectedTimeframe: thời gian đã chọn
 * @returns 
 */
export default function CodeAnalysisImprovementChart({
  analysisData,
  setSelectedTimeframe,
  selectedTimeframe,
}: CodeAnalysisImprovementChartProps) {
  const t = useTranslations();
  const t_codeAnalysis = useTranslations('codeAnalysis');
  const { theme } = useDarkMode();

  const colors = ['#ef4444', '#f59e0b', '#8b5cf6', '#10b981', '#3b82f6'];

  const chartOption = useMemo(() => {
    if (!analysisData || analysisData?.length < 2) {
      return null;
    }

    // Sort data by analyzed date
    const sortedData = [...analysisData]
      .filter(
        item =>
          item.status.toLowerCase() === 'completed' || item.status.toLowerCase() === 'success',
      )
      .sort((a, b) => new Date(a.analyzedAt).getTime() - new Date(b.analyzedAt).getTime());

    if (sortedData.length < 2) {
      return null;
    }

    // Get key metrics for trend analysis - lấy 5 cái đầu theo thứ tự của ENUM_METRICS_CODE_ANALYSIS
    const keyMetrics = Object.values(ENUM_METRICS_CODE_ANALYSIS).slice(0, 5);

    const dates = sortedData.map(item => utils_DateToDDMMYYYY(item.analyzedAt));
    const series: Array<{
      name: string;
      type: string;
      data: (number | null)[];
      smooth: boolean;
      symbol: string;
      symbolSize: number;
      lineStyle: { width: number };
      connectNulls: boolean;
    }> = [];

    keyMetrics.forEach(metricName => {
      const metricData = sortedData.map(analysis => {
        const metric = analysis.metrics?.find(m => m.name === metricName);
        return metric ? parseFloat(metric.value.toString()) : null;
      });

      // Only add series if we have data
      if (metricData.some(val => val !== null)) {
        const metricLabel = t(
          METRICS_CODE_ANALYSIS?.find(m => m.value === metricName)?.labelKey || metricName,
        );

        series.push({
          name: metricLabel,
          type: 'line',
          data: metricData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 3,
          },
          connectNulls: false,
        });
      }
    });

    return {
      color: colors,
      tooltip: {
        trigger: 'axis',
        backgroundColor: theme.backgroundColor,
        textStyle: {
          color: theme.textColor,
        },
        borderWidth: 0,
        borderRadius: 8,
        extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
        formatter: function (
          params: Array<{
            axisValueLabel: string;
            value: number | null;
            color: string;
            seriesName: string;
          }>,
        ) {
          let result = `<div style="font-weight: 600; margin-bottom: 8px;">${params[0].axisValueLabel}</div>`;
          params.forEach(param => {
            if (param.value !== null) {
              result += `<div style="display: flex; align-items: center; margin: 4px 0;">
                          <div style="width: 10px; height: 10px; background: ${param.color}; border-radius: 50%; margin-right: 8px;"></div>
                          <span>${param.seriesName}: <strong>${param.value ?? 0}</strong></span>
                        </div>`;
            }
          });
          return result;
        },
      },
      legend: {
        data: series.map(s => s.name),
        bottom: 10,
        textStyle: {
          color: theme.textColor,
        },
      },
      grid: {
        top: 80,
        left: 60,
        right: 40,
        bottom: 80,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: {
          lineStyle: {
            color: theme.axisLineColor || '#e5e7eb',
          },
        },
        axisLabel: {
          color: theme.textColor,
          rotate: 45,
          fontSize: 12,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: theme.textColor,
          fontSize: 12,
        },
        axisLine: {
          lineStyle: {
            color: theme.axisLineColor || '#e5e7eb',
          },
        },
        splitLine: {
          lineStyle: {
            color: theme.splitLineColor || '#f3f4f6',
            type: 'dashed',
          },
        },
      },
      series: series,
      animation: true,
      animationDuration: 1000,
    };
  }, [analysisData, theme, t]);

  const getTrendAnalysis = () => {
    if (!analysisData || analysisData?.length < 2) return null;

    const sortedData = [...analysisData]
      .filter(
        item =>
          item.status.toLowerCase() === 'completed' || item.status.toLowerCase() === 'success',
      )
      .sort((a, b) => new Date(a.analyzedAt).getTime() - new Date(b.analyzedAt).getTime());

    if (sortedData.length < 2) return null;

    const latest = sortedData[sortedData.length - 1];
    const previous = sortedData[sortedData.length - 2];

    const trends: Array<{
      name: string;
      trend: 'up' | 'down' | 'stable';
      change: number;
      isImprovement: boolean;
    }> = [];

    // Lấy 4 metrics đầu theo thứ tự của ENUM_METRICS_CODE_ANALYSIS
    const keyMetrics = [
      { key: Object.values(ENUM_METRICS_CODE_ANALYSIS)[0], lowerIsBetter: false },
      { key: Object.values(ENUM_METRICS_CODE_ANALYSIS)[1], lowerIsBetter: false },
      { key: Object.values(ENUM_METRICS_CODE_ANALYSIS)[2], lowerIsBetter: true },
      { key: Object.values(ENUM_METRICS_CODE_ANALYSIS)[3], lowerIsBetter: false },
      { key: Object.values(ENUM_METRICS_CODE_ANALYSIS)[4], lowerIsBetter: true },
    ];

    keyMetrics.forEach(({ key, lowerIsBetter }) => {
      const latestMetric = latest.metrics?.find(m => m.name === key);
      const previousMetric = previous.metrics?.find(m => m.name === key);

      if (latestMetric && previousMetric) {
        const latestValue = parseFloat(latestMetric.value.toString());
        const previousValue = parseFloat(previousMetric.value.toString());
        const change = latestValue - previousValue;
        const percentChange = previousValue !== 0 ? (change / previousValue) * 100 : 0;

        let trend: 'up' | 'down' | 'stable' = 'stable';
        let isImprovement = false;

        if (Math.abs(percentChange) > 1) {
          if (change > 0) {
            trend = 'up';
            isImprovement = !lowerIsBetter;
          } else {
            trend = 'down';
            isImprovement = lowerIsBetter;
          }
        }

        const metricName = t(METRICS_CODE_ANALYSIS?.find(m => m.value === key)?.labelKey || key);
        trends.push({
          name: metricName,
          trend,
          change: Math.abs(percentChange),
          isImprovement,
        });
      }
    });

    return trends;
  };

  const trends = getTrendAnalysis();

  if (!chartOption && (!analysisData || analysisData.length < 2)) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-full">
          <TextHeading className="flex items-center gap-2">
            <IconTrendingUp className="size-5" />
            {t('codeAnalysis.improveCodeAnalysis')}
          </TextHeading>
        </div>
        <div>
          <div className="text-center py-12 text-gray-500">
            <p>{t_codeAnalysis('needAtLeast2Analysis')}</p>
            <p className="text-sm mt-2">{t_codeAnalysis('dataWillBeDisplayedAfterMoreAnalysis')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 w-full">
        <CardTitle className="flex items-center gap-2 w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex-1 flex item-center gap-2">
              <IconTrendingUp className="size-5" />
              {t('codeAnalysis.improveCodeAnalysis')}
            </div>
            <MySelect
              options={[
                ...(timeFilters.map(option => {
                  return {
                    labelKey: t_codeAnalysis(option.label),
                    value: option.value,
                  };
                }) ?? []),
              ]}
              size="sm"
              defaultValue={selectedTimeframe}
              name="selectedTimeframe"
              className="min-w-[120px]"
              isTranslate={false}
              onChange={value => setSelectedTimeframe(value)}
            />
          </div>
        </CardTitle>
      </div>
      <div className="space-y-6">
        {/* Chart */}
        {chartOption && (
          <div className="border rounded-lg p-4">
            <ReactECharts
              option={chartOption}
              style={{ height: '400px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        )}

        {/* Trend Summary */}
        {trends && trends.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t_codeAnalysis('recentChanges')}:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trends.map((trend, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    trend.isImprovement
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                      : trend.trend === 'stable'
                      ? 'bg-gray-50 border-gray-200 dark:bg-gray-800/20 dark:border-gray-700'
                      : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors[index] }}
                    ></span>
                    <span className="text-sm font-medium">{trend.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {trend.trend === 'up' && (
                      <IconTrendingUp
                        className={`size-4 ${
                          trend.isImprovement ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                    )}
                    {trend.trend === 'down' && (
                      <IconTrendingDown
                        className={`size-4 ${
                          trend.isImprovement ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                    )}
                    {trend.trend === 'stable' && <IconMinus className="size-4 text-gray-600" />}
                    <span
                      className={`text-sm font-semibold ${
                        trend.isImprovement
                          ? 'text-green-600'
                          : trend.trend === 'stable'
                          ? 'text-gray-600'
                          : 'text-red-600'
                      }`}
                    >
                      {trend.trend === 'stable' ? '0%' : `${trend.change.toFixed(1)}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
