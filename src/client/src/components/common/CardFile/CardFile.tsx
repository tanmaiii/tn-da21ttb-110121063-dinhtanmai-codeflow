import { Button } from '@/components/ui/button';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { SVGS } from '@/data/images';
import { IDocument } from '@/interfaces/course';
import { utils_file_size } from '@/utils/file';
import { IconDownload, IconEye } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ActionViewPDF from '../Action/ActionViewPDF';
import apiConfig from '@/lib/api';

export default function CardFile({ file }: { file: IDocument }) {
  const [pdfUrl, setPdfUrl] = useState<File | null>(null);

  useEffect(() => {
    async function fetchPDF() {
      const res = file && (await fetch(apiConfig.fileUrl(file.url)));
      const blob = res && (await res.blob());

      // Tạo File object nếu muốn
      const pdf = new File([blob], file.title, { type: blob.type });

      // Hoặc tạo Object URL từ blob để hiển thị
      if (file) {
        setPdfUrl(pdf);
      }
    }

    fetchPDF();
  }, [file]);

  return (
    <div className="border rounded-md p-4 hover:bg-input/10 cursor-pointer group">
      <div className="flex items-center justify-between bg-input/20 h-[120px] rounded-xs relative ">
        <Image src={SVGS.FOLDER} alt="folder" className="w-full h-full " width={70} height={70} />
        {pdfUrl && (
          <ActionViewPDF
            file={pdfUrl}
            trigger={
              <Button
                variant="none"
                size={'icon'}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
              >
                <IconEye className="size-5" />
              </Button>
            }
          />
        )}
      </div>
      <div className="flex flex-row items-center justify-between gap-1 mt-2">
        <div className="flex flex-col items-start justify-between gap-1 mt-2 overflow-hidden">
          <TextHeading lineClamp={1}>{file.title}</TextHeading>
          <TextDescription className="text-xs">{pdfUrl ? utils_file_size(pdfUrl.size) : '0 KB'}</TextDescription>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            const link = document.createElement('a');
            link.href = apiConfig.fileUrl(file.url);
            link.download = file.title;
            link.click();
          }}
        >
          <IconDownload className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
