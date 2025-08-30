import DataExport from '@/components/common/DataTable/data-export';
import { STATUS_COURSE, TYPE_COURSE } from '@/constants/object';
import { ICourse } from '@/interfaces/course';
import { util_get_course_status, util_remove_html_tags } from '@/utils/common';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface CoursesExportProps {
  data: ICourse[];
}

export default function CoursesExport({ data }: CoursesExportProps) {
  const tCourse = useTranslations('course');
  const t = useTranslations();

  const columnsExport = useMemo(
    () => [
      { key: 'title', label: tCourse('title') },
      { key: 'description', label: tCourse('description') },
      { key: 'author', label: tCourse('author') },
      { key: 'type', label: tCourse('typeCourse') },
      { key: 'status', label: tCourse('status') },
      { key: 'startDate', label: tCourse('startDate') },
      { key: 'endDate', label: tCourse('endDate') },
    ],
    [tCourse],
  );

  const transformCourseForExport = (course: ICourse) => {
    const statusType = util_get_course_status(
      course.startDate,
      course.endDate,
      course.regStartDate,
      course.regEndDate,
    );

    const typeLabel = TYPE_COURSE.find(item => item.value === course.type)?.labelKey ?? '';
    const statusLabel = STATUS_COURSE.find(item => item.value === statusType)?.labelKey ?? '';

    return {
      ...course,
      description: util_remove_html_tags(course.description),
      author: course.author?.name || '',
      type: t(typeLabel),
      status: t(statusLabel),
      startDate: course.startDate ? utils_DateToDDMMYYYY(course.startDate) : '',
      endDate: course.endDate ? utils_DateToDDMMYYYY(course.endDate) : '',
    };
  };

  return (
    <DataExport
      values={data?.map(transformCourseForExport) || []}
      columns={columnsExport}
      fileName="courses.xlsx"
    />
  );
}
