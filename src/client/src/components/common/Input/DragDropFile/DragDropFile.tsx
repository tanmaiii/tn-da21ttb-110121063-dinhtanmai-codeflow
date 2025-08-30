import ActionViewPDF from '@/components/common/Action/ActionViewPDF';
import { Button } from '@/components/ui/button';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { utils_file_size } from '@/utils/file';
import { IconFile, IconFolder, IconX } from '@tabler/icons-react';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface DragDropFileProps extends React.HTMLProps<HTMLInputElement> {
  files: File[] | [];
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  maxSize?: number;
  maxFiles?: number;
  accept?: string;
}

export default function DragDropFile(props: DragDropFileProps) {
  const {
    files: filesDefault,
    onChange,
    className,
    maxSize = 5,
    maxFiles = 2,
    accept = 'application/pdf',
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [openDrop, setOpenDrop] = useState(false);
  const [files, setFiles] = useState<File[] | []>([]);
  const t = useTranslations('validate');
  const tCommon = useTranslations('common');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onChange) {
        // Create a new event with combined files
        const newFiles = Array.from(e.target.files);

        // Check file size
        const invalidFiles = newFiles.filter(file => file.size > maxSize * 1024 * 1024);
        if (invalidFiles.length > 0) {
          toast.error(t('fileMaxSize', { length: `${maxSize} MB` }));
          return;
        }

        const combinedFiles = [...files, ...newFiles];

        if (maxFiles && combinedFiles.length > maxFiles) {
          toast.error(t('fileMaxFiles', { length: `${maxFiles}` }));
          return;
        }

        if (accept && !accept.includes(newFiles[0].type)) {
          toast.error(t('fileNotAccepted', { field: `${accept}` }));
          return;
        }

        // Create a new FileList-like object
        const dataTransfer = new DataTransfer();
        combinedFiles.forEach(file => dataTransfer.items.add(file));

        // Create a new event with the combined files
        const newEvent = {
          target: {
            files: dataTransfer.files,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onChange(newEvent);
      }
    }
    setOpenDrop(false);
  };

  const onRemove = (file: File) => {
    const newFiles = files.filter(f => f !== file);
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));

    onChange({
      target: { files: dataTransfer.files },
    } as unknown as React.ChangeEvent<HTMLInputElement>);

    if (inputRef.current) {
      inputRef.current.value = '';
      setFiles(newFiles);
    }
  };

  useEffect(() => {
    setFiles(filesDefault || []);
  }, [filesDefault]);


  return (
    <div>
      <div
        className={cx('flex flex-col gap-2 mb-4', className)}
        onDragEnter={() => setOpenDrop(true)}
        onDragLeave={() => setOpenDrop(false)}
      >
        <div className="relative flex flex-col gap-2 w-full h-full min-h-[200px]">
          <label
            htmlFor="file-pdf"
            className={cx(
              'flex flex-col absolute gap-4 w-full h-full border-2 border-dashed rounded-lg justify-center items-center cursor-pointer z-10',
              { 'opacity-100 ': openDrop },
            )}
          >
            <motion.div
              animate={{
                y: openDrop ? -10 : 0,
                opacity: openDrop ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            >
              <IconFolder size={60} className={cx('text-color-2')} />
            </motion.div>
            <TextHeading className="text-color-2">
              {tCommon('dragDrop', { field: tCommon('file') })}
            </TextHeading>
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              variant={'outline'}
              className="w-fit"
            >
              {tCommon('upload', { field: tCommon('file') })}
            </Button>
            <input
              ref={inputRef}
              type="file"
              id="file-pdf"
              multiple
              name="files"
              className="w-full h-full absolute opacity-0 cursor-pointer"
              hidden
              {...props}
              onChange={onChangeInput}
            />
          </label>
        </div>
      </div>
      {files.map(file => (
        <FileItem key={file.name} file={file} onRemove={onRemove} />
      ))}
    </div>
  );
}

const FileItem = ({ file, onRemove }: { file: File; onRemove: (file: File) => void }) => {
  return (
    <ActionViewPDF
      file={file}
      trigger={
        <div className="flex flex-row gap-2 mb-3 items-center p-2 hover:bg-input/50 rounded-sm border cursor-pointer">
          <div className="p-2">
            <IconFile size={26} className={cx('text-color-2')} />
          </div>
          <div className="flex flex-1 flex-col gap-1 overflow-hidden">
            <TextHeading className="line-clamp-1">{file.name}</TextHeading>
            <TextDescription>{utils_file_size(file.size)}</TextDescription>
          </div>
          <Button type="button" variant={'none'} className="w-fit" onClick={() => onRemove(file)}>
            <IconX size={20} className={cx('text-color-2 ')} />
          </Button>
        </div>
      }
      title={file.name}
    />
  );
};
