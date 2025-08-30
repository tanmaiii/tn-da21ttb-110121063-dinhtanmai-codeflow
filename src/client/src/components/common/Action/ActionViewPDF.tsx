import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState, useEffect } from 'react';

interface ActionViewPDFProps {
  trigger: React.ReactNode;
  title?: string;
  file?: File;
}

export default function ActionViewPDF({ trigger, title, file }: ActionViewPDFProps) {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [isValidFile, setIsValidFile] = useState<boolean>(false);

  useEffect(() => {
    if (file) {
      // Kiểm tra file có phải là PDF không
      if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        setIsValidFile(true);
      } else {
        setIsValidFile(false);
      }
    } else {
      setIsValidFile(false);
    }

    // Cleanup URL khi component unmount
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [file]);

  if (!isValidFile) {
    return null; // Không hiển thị gì nếu file không hợp lệ
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="!max-w-[90vw] w-full h-[96vh] overflow-auto">
        <div className="flex-1">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <iframe src={fileUrl} className="w-full h-full" title={title} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
