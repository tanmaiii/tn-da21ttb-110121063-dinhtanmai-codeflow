'use client';

import { MyCheckbox } from '@/components/common/MyCheckbox';
import NameTags from '@/components/common/NameTags/NameTags';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TextHeading from '@/components/ui/text';
import { ITag } from '@/interfaces/tags';
interface SearchFiltersProps {
  filters: {
    keyword: string;
    types: ('course' | 'post' | 'topic')[];
  };
  tags: ITag[];
  isAllTypesSelected: boolean;
  hasActiveFilters: boolean;
  onToggleType: (type: 'course' | 'post' | 'topic') => void;
  onToggleAllTypes: () => void;
  onResetFilters: () => void;
}

export default function SearchFilters({
  filters,
  tags,
  isAllTypesSelected,
  hasActiveFilters,
  onToggleType,
  onToggleAllTypes,
  onResetFilters,
}: SearchFiltersProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bộ lọc</CardTitle>
        {hasActiveFilters && (
          <button onClick={onResetFilters} className="text-xs text-red-500 hover:text-red-700">
            Reset tất cả
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Data Type Filters */}
        <div className="space-y-2">
          <TextHeading>Loại nội dung</TextHeading>
          <div className="space-y-2">
            <MyCheckbox
              label="Tất cả"
              id="all-types"
              checked={isAllTypesSelected}
              onChange={onToggleAllTypes}
            />
            <MyCheckbox
              label="Khóa học"
              id="course"
              checked={filters.types.includes('course')}
              onChange={() => onToggleType('course')}
            />
            <MyCheckbox
              label="Bài viết"
              id="post"
              checked={filters.types.includes('post')}
              onChange={() => onToggleType('post')}
            />
            <MyCheckbox
              label="Đề tài"
              id="topic"
              checked={filters.types.includes('topic')}
              onChange={() => onToggleType('topic')}
            />
          </div>
        </div>
        {/* Tag Filters */}
        <div className="space-y-2">
          <TextHeading>Tags</TextHeading>
          <div className="space-y-2">
            <NameTags
              tags={tags?.map(tag => ({
                id: tag.id,
                name: tag.name,
                description: tag.description,
              }))}
              max={tags.length}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
