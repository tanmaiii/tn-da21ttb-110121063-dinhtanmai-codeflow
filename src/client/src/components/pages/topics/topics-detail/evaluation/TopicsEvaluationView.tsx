import ActionModal from '@/components/common/Action/ActionModal';
import { ITopicEvaluation } from '@/interfaces/topic';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { IconMessageCircle, IconUser, IconCalendarTime } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export default function TopicsEvaluationView({ evaluation }: { evaluation: ITopicEvaluation }) {
  const t = useTranslations('topic');

  return (
    <ActionModal actionType={'view'} className="max-w-[600px] min-w-[600px]">
      <div className="space-y-4 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-background-2/50 rounded-lg border border-slate-200 dark:border-zinc-800">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <IconMessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('evaluation')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{evaluation.evaluation}</p>
            </div>
          </div>

          {/* Author and Time Information */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Author */}
            {evaluation.user && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-background-2/50 rounded-lg border border-slate-200 dark:border-zinc-800 flex-1">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <IconUser className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t('author')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {evaluation.user.name}
                  </p>
                </div>
              </div>
            )}

            {/* Created Time */}
            {evaluation.createdAt && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-background-2/50 rounded-lg border border-slate-200 dark:border-zinc-800 flex-1">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <IconCalendarTime className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t('time')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {utils_DateToDDMMYYYY(evaluation.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ActionModal>
  );
}
