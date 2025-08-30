import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { IconPrinter } from '@tabler/icons-react';
import { useRef } from 'react';
import * as XLSX from 'xlsx';
import ActionButtonModal from '../Action/ActionButtonModal';
import { useTranslations } from 'next-intl';

interface DataExportColumn {
  key: string;
  label: string;
}

interface DataExportProps<TData> {
  values?: TData[];
  columns: DataExportColumn[];
  fileName?: string;
}

export default function DataExport<TData extends Record<string, unknown>>({
  values = [],
  columns,
  fileName = 'export.xlsx',
}: DataExportProps<TData>) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('common');

  const handleExport = () => {
    if (!values || values.length === 0 || !columns || columns.length === 0) return;

    const headers = columns.map(col => col.label);
    const aoa: unknown[][] = [headers];

    for (const item of values) {
      const dataRow = columns.map(col => {
        const value = (item as Record<string, unknown>)[col.key];
        if (value == null) return '';
        if (value instanceof Date) return value;
        if (typeof value === 'object') return JSON.stringify(value);
        return value as unknown;
      });
      aoa.push(dataRow);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(aoa);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, fileName);

    btnRef.current?.click();

  };

  return (
    <>

      <ActionButtonModal
        title={t('export')}
        actionType="export"
        icon={<IconPrinter className="w-4 h-4" />}
      >
        <div>
          {t('exportConfirm')}
          <div className="flex gap-2 mt-4 justify-end">
            <DialogClose ref={btnRef} asChild>
              <Button variant="outline">{t('cancel')}</Button>
            </DialogClose>
            <Button onClick={handleExport}>{t('export')}</Button>
          </div>
        </div>
      </ActionButtonModal>
    </>
  );
}
