import ActionModal from '@/components/common/Action/ActionModal';
import CardMetric from '@/components/common/CardMetric/inrdex';
import MyBadge from '@/components/common/MyBadge';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import { STATUS_CODE_ANLYSIS } from '@/constants/object';
import { ICodeAnalysis, ITopicMetrics } from '@/interfaces/code_analysis';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { IconChartBar } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { utils_DateToDDMMYYYY_HHMM } from '../../../../utils/date';

interface CodeAnalysisModalProps {
  metrics: ITopicMetrics[];
  codeAnalysis: ICodeAnalysis;
}

export default function CodeAnalysisModal({ metrics, codeAnalysis }: CodeAnalysisModalProps) {
  // const t = useTranslations();
  const t_codeAnalysis = useTranslations('codeAnalysis');

  return (
    <ActionModal
      title={t_codeAnalysis('viewAnalysis')}
      actionType="non-icon"
      className="min-w-[90vw] lg:min-w-[70vw]"
      icon={
        <Button variant="outline" size="sm" className="text-xs">
          <IconChartBar className="size-3 mr-1" />
          {t_codeAnalysis('viewAnalysis')}
        </Button>
      }
    >
      <div className="space-y-4">
        {codeAnalysis.author && (
          <div className="flex items-center gap-1">
            <MemberAvatar
              name={codeAnalysis.author.name || ''}
              avatar={codeAnalysis.author.avatar}
              description={codeAnalysis.author?.username}
              size={30}
              id={codeAnalysis.author.id}
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">{t_codeAnalysis('branch')}:</span>{' '}
            {codeAnalysis.branch}
          </div>
          <div>
            <span className="font-medium">{t_codeAnalysis('status')}: </span>
            <MyBadge
              className="w-fit ml-2"
              status={STATUS_CODE_ANLYSIS.find(item => item.value === codeAnalysis?.status)!}
            />
          </div>
          <div>
            <span className="font-medium">Pull request number:</span>
            <code className="ml-1 text-xs bg-gray-100 px-1 rounded dark:bg-gray-500">
              {codeAnalysis.workflowRunId}
            </code>
          </div>
          <div>
            <span className="font-medium">{t_codeAnalysis('analyzedAt')}:</span>{' '}
            {utils_DateToDDMMYYYY_HHMM(codeAnalysis?.createdAt ?? '')}
          </div>
        </div>

        <Separator />
        <CardMetric metrics={metrics} />

        {(!metrics || metrics.length === 0) && (
          <div className="text-center py-8 text-gray-500">Không có dữ liệu metrics để hiển thị</div>
        )}
      </div>
    </ActionModal>
  );
}
