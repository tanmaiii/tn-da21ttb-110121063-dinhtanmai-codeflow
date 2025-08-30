import { CoursesDetail } from '@/components/pages/courses/course-detail';
import CoursesCheck from '@/components/pages/courses/course-detail/CoursesCheck';

export default function Page() {
  return (
    <CoursesCheck>
      <CoursesDetail />
    </CoursesCheck>
  );
}
