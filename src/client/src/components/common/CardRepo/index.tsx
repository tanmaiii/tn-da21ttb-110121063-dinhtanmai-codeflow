import TextHeading from '@/components/ui/text';
import { paths } from '@/data/path';
import { IRepos } from '@/interfaces/repos';
import { IconBrandGithub, IconCloudX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import CardRepo_More from './CardRepoMore';

export default function CardRepo({ repos }: { repos: IRepos }) {
  const router = useRouter();
  const onClick = () => {
    router.push(paths.REPOS_DETAIL(repos.id));
  };

  return (
    <div
      key={repos.id}
      className="group relative flex cursor-pointer items-center gap-2 p-2 rounded-md border border-input hover:bg-accent/50 transition-colors"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="p-2 bg-color-2/10 rounded-full">
          {repos.deletedAt ? (
            <IconCloudX className="size-4 text-red-500" />
          ) : (
            <IconBrandGithub className="size-4 text-muted-foreground" />
          )}
        </div>
        <div>
          <TextHeading onClick={onClick} lineClamp={1} className="break-all text-sm font-medium">
            {repos.name}
          </TextHeading>
        </div>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <CardRepo_More className="bg-white dark:bg-black rounded-full" repos={repos} />
      </div>
    </div>
  );
}
