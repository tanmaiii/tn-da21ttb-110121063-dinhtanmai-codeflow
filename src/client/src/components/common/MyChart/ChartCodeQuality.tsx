'use client';
import ActionModal from '@/components/common/Action/ActionModal';
import CardMetric from '@/components/common/CardMetric/inrdex';
import { ChartWrapper } from '@/components/common/ChartWrapper';
import { Button } from '@/components/ui/button';
import { ENUM_METRICS_CODE_ANALYSIS } from '@/constants/enum';
import { METRICS_CODE_ANALYSIS } from '@/constants/object';
import { useDarkMode } from '@/hooks';
import { ITopicMetrics } from '@/interfaces/code_analysis';
import { IconChartBar } from '@tabler/icons-react';
import { Code } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export default function ChartCodeQuality({
  data,
  isLoading = false,
}: {
  data?: ITopicMetrics[];
  isLoading: boolean;
}) {
  const { theme } = useDarkMode();
  const t = useTranslations();
  const t_dashboard = useTranslations('dashboard.charts.codeQuality');

  // const { data, isLoading, isError } = useQ_CodeAnalysis_GetByCourseId(courseId);

  // Phân nhóm metrics theo loại và cách hiển thị
  const metricGroups = useMemo(() => {
    return {
      // Nhóm 1: Quality Ratings (A-E scale) - Hiển thị trực tiếp
      ratings: [
        ENUM_METRICS_CODE_ANALYSIS.SQALE_RATING,
        ENUM_METRICS_CODE_ANALYSIS.RELIABILITY_RATING,
        ENUM_METRICS_CODE_ANALYSIS.SECURITY_RATING,
        ENUM_METRICS_CODE_ANALYSIS.SECURITY_REVIEW_RATING,
      ],
      // Nhóm 2: Issues (Count-based) - Càng ít càng tốt
      issues: [
        ENUM_METRICS_CODE_ANALYSIS.BUGS,
        ENUM_METRICS_CODE_ANALYSIS.VULNERABILITIES,
        ENUM_METRICS_CODE_ANALYSIS.CODE_SMELLS,
        ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS,
      ],
      // Nhóm 3: Coverage (Percentage-based) - Càng cao càng tốt
      coverage: [
        ENUM_METRICS_CODE_ANALYSIS.COVERAGE,
        ENUM_METRICS_CODE_ANALYSIS.LINE_COVERAGE,
        ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS_REVIEWED,
      ],
      // Nhóm 4: Complexity (Scale-based) - Càng thấp càng tốt
      complexity: [
        ENUM_METRICS_CODE_ANALYSIS.SQALE_INDEX,
        ENUM_METRICS_CODE_ANALYSIS.COMPLEXITY,
        ENUM_METRICS_CODE_ANALYSIS.COGNITIVE_COMPLEXITY,
      ],
    };
  }, []);

  // Chuyển đổi rating từ A-E sang số (0-100)
  const getRatingScore = (rating: number) => {
    switch (rating) {
      case 1:
        return 100; // A
      case 2:
        return 80; // B
      case 3:
        return 60; // C
      case 4:
        return 40; // D
      case 5:
        return 20; // E
      default:
        return 0;
    }
  };

  // Tính điểm cho issues (càng ít càng tốt)
  const getIssuesScore = (value: number, maxIssues: number = 20) => {
    // Nếu không có issues = 100 điểm
    if (value === 0) return 100;
    // Nếu có nhiều issues = điểm thấp
    const score = Math.max(0, 100 - (value / maxIssues) * 100);
    return Math.round(score);
  };

  // Tính điểm cho complexity (càng thấp càng tốt)
  const getComplexityScore = (value: number, maxComplexity: number = 100) => {
    const score = Math.max(0, 100 - (value / maxComplexity) * 100);
    return Math.round(score);
  };

  // Tạo dữ liệu cho bar chart với chuẩn hóa về thang điểm 0-100
  const barData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    // Lấy 10 metrics đầu tiên của ENUM_METRICS_CODE_ANALYSIS
    const selectedMetrics = [
      ENUM_METRICS_CODE_ANALYSIS.BUGS,
      ENUM_METRICS_CODE_ANALYSIS.VULNERABILITIES,
      ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS_REVIEWED,
      ENUM_METRICS_CODE_ANALYSIS.CODE_SMELLS,
      ENUM_METRICS_CODE_ANALYSIS.SQALE_INDEX,
      ENUM_METRICS_CODE_ANALYSIS.SQALE_RATING,
      ENUM_METRICS_CODE_ANALYSIS.RELIABILITY_RATING,
      ENUM_METRICS_CODE_ANALYSIS.SECURITY_RATING,
      ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS,
      ENUM_METRICS_CODE_ANALYSIS.COMPLEXITY,
    ];

    return selectedMetrics.map(metricKey => {
      const metric = data.find((m: { name: string }) => m.name === metricKey);
      const metricConfig = METRICS_CODE_ANALYSIS.find(m => m.value === metricKey);

      if (!metric || !metricConfig) {
        return {
          name: t(metricConfig?.labelKey || metricKey),
          value: 0,
          originalValue: 0,
          metricKey,
          unit: '',
          category: 'unknown',
        };
      }

      const originalValue =
        typeof metric.value === 'string' ? parseFloat(metric.value) : metric.value || 0;
      let normalizedValue = 0;
      let unit = '';
      let category = '';

      // Chuẩn hóa tất cả metrics về thang điểm 0-100
      if (metricGroups.ratings.includes(metricKey)) {
        // Ratings: A-E (1-5) → 0-100
        normalizedValue = getRatingScore(originalValue);
        unit = 'rating';
        category = 'rating';
      } else if (metricGroups.issues.includes(metricKey)) {
        // Issues: càng ít càng tốt → 0-100
        normalizedValue = getIssuesScore(originalValue, 20);
        unit = 'issues';
        category = 'issue';
      } else if (metricGroups.coverage.includes(metricKey)) {
        // Coverage: càng cao càng tốt, đã là 0-100
        normalizedValue = Math.min(100, originalValue);
        unit = '%';
        category = 'coverage';
      } else if (metricGroups.complexity.includes(metricKey)) {
        // Complexity: càng thấp càng tốt → 0-100
        normalizedValue = getComplexityScore(originalValue, 100);
        unit = 'points';
        category = 'complexity';
      } else {
        // Mặc định cho các metrics khác (ALERT_STATUS)
        normalizedValue = originalValue;
        unit = '';
        category = 'other';
      }

      return {
        name: t(metricConfig.labelKey),
        value: normalizedValue, // Giá trị đã chuẩn hóa (0-100)
        originalValue: originalValue, // Giá trị gốc
        metricKey,
        unit,
        category,
      };
    });
  }, [data, metricGroups, t]);

  // Bar chart option
  const barOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
      formatter: function (params: { name: string }[]) {
        const param = params[0];
        const metric = barData.find(m => m.name === param.name);
        if (!metric) return '';

        let displayValue: string | number = metric.originalValue;
        let unit = metric.unit;

        // Xử lý đặc biệt cho ratings
        if (metric.category === 'rating') {
          const ratingLabels = ['A', 'B', 'C', 'D', 'E'];
          displayValue = ratingLabels[metric.originalValue - 1] || metric.originalValue;
          unit = '';
        }

        return `${metric.name}: ${displayValue} ${unit} (${metric.value})`;
      },
    },
    xAxis: {
      type: 'category',
      data: (barData || []).map(item => item.name),
      axisLabel: {
        color: theme.textColor,
        fontSize: 10,
        rotate: 45,
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
        },
      },
    },
    series: [
      {
        type: 'bar',
        data: (barData || []).map(item => ({
          value: item.value,
          itemStyle: {
            color:
              item.category === 'rating'
                ? '#8b5cf6' // Tím cho ratings
                : item.category === 'issue'
                ? '#ef4444' // Đỏ cho issues
                : item.category === 'coverage'
                ? '#10b981' // Xanh lá cho coverage
                : item.category === 'complexity'
                ? '#3b82f6' // Xanh dương cho complexity
                : '#6b7280', // Xám cho các metrics khác
          },
        })),
        barWidth: '60%',
      },
    ],
  };

  return (
    <ChartWrapper
      option={barOption}
      isLoading={isLoading}
      rightComponent={<MetricsModalCodeQuality metrics={data ?? []} />}
      label={t_dashboard('title')}
      description={t_dashboard('description')}
      icon={<Code className="w-5 h-5" />}
    />
  );
}

export function MetricsModalCodeQuality({ metrics }: { metrics: ITopicMetrics[] }) {
  const t = useTranslations();

  return (
    <ActionModal
      title={'Code anylics'}
      actionType="non-icon"
      className="min-w-[90vw] lg:min-w-[70vw]"
      icon={
        <Button variant="outline" size="sm" className="text-xs">
          <IconChartBar className="size-3 mr-1" />
          {t('common.all')}
        </Button>
      }
    >
      <div className="flex flex-col gap-4 pb-4">
        <CardMetric metrics={metrics} />
      </div>
    </ActionModal>
  );
}
