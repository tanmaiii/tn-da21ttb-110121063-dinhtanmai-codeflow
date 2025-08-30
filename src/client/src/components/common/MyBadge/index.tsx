import { Badge } from '@/components/ui/badge';
import { IStatusObj } from '@/constants/object';
import { util_object_to_color } from '@/utils/common';
import { useTranslations } from 'next-intl';

export default function MyBadge({
  status,
  className,
}: {
  status: IStatusObj;
  className?: string;
}) {
  const colors = util_object_to_color(status);
  const t = useTranslations();

  return (
    <Badge className={`${colors.bg} ${colors.text} ${colors?.bgHover} shadow-none rounded-full whitespace-nowrap ${className}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${colors.dot} mr-2`} />
      {t(status.labelKey)}
    </Badge>
  );
}
