'use client';
import NameTags from '@/components/common/NameTags/NameTags';
import TitleHeader from '@/components/layout/TitleHeader';
import TextHeading from '@/components/ui/text';
import useQ_Tag_GetAll from '@/hooks/query-hooks/Tag/useQ_Tag_GetAll';
import useQ_Tag_GetDetail from '@/hooks/query-hooks/Tag/useQ_Tag_GetDetail';
import { useParams } from 'next/navigation';
import LoadMore from './LoadMore';

export default function Tag() {
  const params = useParams();

  const { data: tag } = useQ_Tag_GetDetail({
    id: params?.tag as string,
  });

  const { data: tags } = useQ_Tag_GetAll();

  return (
    <div className="pt-6">
      <div className="">
        <TitleHeader title={`Tag: ${tag?.data?.name}`} onBack={true} />
        <div className="border rounded-md p-4">
          <TextHeading className="text-4xl font-bold"> # {tag?.data?.name}</TextHeading>
          <TextHeading className="mt-4">{tag?.data?.description}</TextHeading>
          <div className="mt-4">
            <TextHeading className="text-2xl font-bold">Related Tags</TextHeading>
            <NameTags
              tags={tags?.data.filter(t => t.id !== tag?.data?.id) || []}
              max={7}
            />
          </div>
        </div>

        <div className="">
          {params?.tag && (
            <LoadMore
              params={{
                page: 1,
                limit: 2,
                dataTypes: ['course', 'post'],
              }}
              tagId={params?.tag as string}
            />
          )}
        </div>
      </div>
    </div>
  );
}
