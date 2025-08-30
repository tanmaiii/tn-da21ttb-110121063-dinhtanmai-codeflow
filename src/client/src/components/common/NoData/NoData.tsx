import TextHeading, { TextDescription } from '@/components/ui/text';
import { SVGS } from '@/data/images';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/theme_store';
import { IconCloudSearch } from '@tabler/icons-react';
import Image from 'next/image';

export default function NoData({ className }: { className?: string }) {
  const { theme } = useThemeStore();

  return (
    <div className={cn('flex flex-col gap-4 w-full h-full justify-center items-center opacity-80', className)}>
      {theme === 'light' ? (
        <Image src={SVGS.NO_DATA} alt="No data" width={400} height={400} />
      ) : (
        <IconCloudSearch className="text-gray-500" size={260} />
      )}
      <TextHeading className="text-5xl font-bold">No result found</TextHeading>
      <TextDescription className="text-center">
        Please try again with different keywords
      </TextDescription>
    </div>
  );
}
