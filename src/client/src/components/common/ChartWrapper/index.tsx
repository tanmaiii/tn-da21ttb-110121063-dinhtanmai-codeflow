'use client';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { ChartArea } from 'lucide-react';

interface ChartWrapperProps {
  option: Record<string, unknown>;
  height?: string;
  className?: string;
  rightComponent?: React.ReactNode;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  option,
  height = '350px',
  className = '',
  rightComponent,
  label,
  description,
  icon,
  isLoading,
  isEmpty,
}) => {
  const t = useTranslations('common');

  return (
    <div className={`bg-background-1 rounded-lg p-4 shadow-sm border border-border ${className}`}>
      <div className="flex justify-between items-center">
        <div>
          {label ? (
            <TextHeading className="text-color-1 text-md flex items-center gap-2 font-medium">
              {icon && icon}
              {label}
            </TextHeading>
          ) : null}
          <TextDescription className="text-color-2 text-md font-medium">
            {description ?? description}
          </TextDescription>
        </div>
        {<div className="flex items-center ml-auto gap-2">{rightComponent}</div>}
      </div>
      {isLoading ? (
        <Skeleton className="w-full h-[350px] mt-2" />
      ) : isEmpty ? (
        <div className="w-full h-[350px] flex items-center justify-center">
          <ChartArea className="w-12 h-12 text-zinc-400" />
          <TextHeading className="text-color-2 text-md font-medium">{t('noData')}</TextHeading>
        </div>
      ) : (
        <ReactECharts
          className="mt-auto"
          option={option}
          style={{ height, width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      )}
    </div>
  );
};
