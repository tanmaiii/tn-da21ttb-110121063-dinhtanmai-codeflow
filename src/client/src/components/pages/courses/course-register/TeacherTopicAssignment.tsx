'use client';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import { Button } from '@/components/ui/button';
import { TextDescription } from '@/components/ui/text';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { ITopic } from '@/interfaces/topic';
import courseService from '@/services/course.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import TopicSelector from './TopicSelector';
import topicService from '@/services/topic.service';
import { useUserStore } from '@/stores/user_store';

// Đăng ký chủ đề của giáo viên
export default function TeacherTopicAssignment() {
  const tTopic = useTranslations('topic');
  const tCommon = useTranslations('common');
  const params = useParams();
  const id = params?.id as string;
  const [selectedTopic, setSelectedTopic] = useState<ITopic | null>(null);
  const [groupName, setGroupName] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const { data: Q_Course } = useQ_Course_GetDetail({ id: id as string });
  const router = useRouter();
  const { user } = useUserStore();

  const mutation = useMutation({
    mutationFn: () => {
      if (!selectedTopic?.id) {
        throw new Error('Topic is not selected');
      }

      return topicService.update(selectedTopic.id, {
        title: selectedTopic.title,
        description: selectedTopic.description,
        courseId: selectedTopic.courseId,
        groupName: groupName,
        members: members,
      });
      
    },
    onSuccess: () => {
      toast.success(tCommon('createSuccess'));
      setSelectedTopic(null);
      setGroupName('');
      setMembers([]);
      router.back();
    },
    onError: () => {
      toast.error(tCommon('createError'));
    },
  });

  const { data: Q_Members } = useQuery({
    queryKey: ['topics', id],
    queryFn: () => courseService.memberInCourse(id as string, { page: 1, limit: 1000 }),
  });

  return (
    <div className="flex flex-col gap-3">
      <TopicSelector
        onSelect={(item: ITopic) => setSelectedTopic(item)}
        courseId={id as string}
      />
      {error && <TextDescription className="text-red-500">{error}</TextDescription>}
      <TextInput
        disabled
        label={tTopic('title')}
        defaultValue={selectedTopic?.title}
        className="w-full flex-1"
      />
      <TextareaInput
        disabled
        defaultValue={selectedTopic?.description}
        label={tTopic('description')}
        className="min-h-[200px]"
      />
      <TextInput
        label={tTopic('groupName')}
        name="name"
        onChange={e => setGroupName(e.target.value)}
      />
      {Q_Course?.data?.maxGroupMembers && Q_Course?.data?.maxGroupMembers > 1 && (
        <div className="flex flex-col gap-2">
          <MyMultiSelect
            label={tTopic('members')}
            name="members"
            maxLength={(Q_Course?.data.maxGroupMembers ?? 3) - 1}
            onChange={value => setMembers(value)}
            options={
              Q_Members?.data
                ?.map(member => ({
                  value: member.id,
                  label: member.name,
                }))
                .filter(member => member?.value !== user?.id) ?? []
            }
          />
        </div>
      )}
      <div className="flex justify-end">
        <Button
          variant="default"
          className="w-fit px-10"
          onClick={() => {
            if (!selectedTopic) {
              setError('Vui lòng chọn chủ đề');
              return;
            }
            mutation.mutate();
          }}
        >
          {tCommon('register')}
        </Button>
      </div>
    </div>
  );
}
