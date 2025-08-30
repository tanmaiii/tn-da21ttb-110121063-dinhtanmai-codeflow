import { TrendingUp } from 'lucide-react';
import React from 'react';

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  subtitle: string;
  gradient: string;
  textColor: string;
}

export default function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
  gradient,
  textColor,
}: MetricCardProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800/90 dark:to-zinc-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-zinc-700/20 shadow-lg"></div>
      <div className="relative p-6 rounded-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${gradient} shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{title}</h3>
            </div>
            <div className="space-y-1">
              <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center text-green-500">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
} 