import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ICourse } from '@/interfaces/course';

export default function FeaturedCourses() {
  return (
    <Card className="min-h-[300px]">
      <CardHeader>
        <CardTitle>Khóa học nổi bật</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {mockData.map(course => (
          <CardCourse key={course.id} course={course} />
        ))}
      </CardContent>
    </Card>
  );
}

const CardCourse = ({ course }: { course: ICourse }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow ">
      <div className="flex gap-4">
        {/* Thumbnail bên trái */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="text-white text-2xl font-bold">
              {course.title.charAt(0)}
            </div>
          </div>
        </div>
        
        {/* Thông tin khóa học bên phải */}
        <div className="flex-1 min-w-0">
          {/* Tiêu đề khóa học */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
            {course.title}
          </h3>
          
          {/* Mô tả ngắn */}
          {/* <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {course.description}
          </p>
           */}
          {/* Thông tin giảng viên */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {course.author?.name?.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {course.author?.name}
            </span>
          </div>
          
          {/* Thống kê khóa học */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{course.maxGroupMembers} thành viên</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{course.topicCount} đề tài</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{course.enrollmentCount} học viên</span>
            </div>
          </div>
          
          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {course.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag.name}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  +{course.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Trạng thái khóa học */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <div className={`px-2 py-1 text-xs rounded-full ${
            course.status 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {course.status ? 'Đang mở' : 'Đã đóng'}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
            <div>Bắt đầu: {new Date(course.startDate).toLocaleDateString('vi-VN')}</div>
            <div>Kết thúc: {new Date(course.endDate).toLocaleDateString('vi-VN')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mockData: ICourse[] = [
  {
    id: '1',
    title: 'Lập trình Web Full-Stack với React & Node.js',
    thumbnail: '',
    description:
      'Khóa học toàn diện về phát triển web full-stack sử dụng React cho frontend và Node.js cho backend. Học viên sẽ được thực hành xây dựng các ứng dụng web hoàn chỉnh.',
    authorId: '1',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    regStartDate: '2024-08-01',
    regEndDate: '2024-08-31',
    topicDeadline: '2024-11-30',
    status: true,
    maxGroupMembers: 4,
    topicCount: 15,
    enrollmentCount: 45,
    type: 'web_development',
    author: {
      id: '1',
      name: 'Nguyễn Văn A',
      username: 'nguyenvana',
      email: 'nguyenvana@example.com',
      role: 'teacher',
      avatar: '',
      bio: 'Giảng viên có 8 năm kinh nghiệm trong phát triển web',
    },
    tags: [
      { id: '1', name: 'React' },
      { id: '2', name: 'Node.js' },
      { id: '3', name: 'Full-Stack' },
    ],
    createdAt: new Date('2024-01-15T00:00:00Z'),
    updatedAt: new Date('2024-08-20T00:00:00Z'),
  },
  {
    id: '2',
    title: 'Phát triển ứng dụng di động với Flutter',
    thumbnail: '',
    description:
      'Khóa học chuyên sâu về phát triển ứng dụng di động đa nền tảng sử dụng Flutter. Học viên sẽ tạo ra các ứng dụng mobile chuyên nghiệp cho cả iOS và Android.',
    authorId: '2',
    startDate: '2024-09-15',
    endDate: '2025-01-15',
    regStartDate: '2024-08-15',
    regEndDate: '2024-09-14',
    topicDeadline: '2024-12-15',
    status: true,
    maxGroupMembers: 3,
    topicCount: 12,
    enrollmentCount: 38,
    type: 'mobile_development',
    author: {
      id: '2',
      name: 'Trần Thị B',
      username: 'tranthib',
      email: 'tranthib@example.com',
      role: 'teacher',
      avatar: '',
      bio: 'Chuyên gia phát triển ứng dụng di động với 6 năm kinh nghiệm',
    },
    tags: [
      { id: '4', name: 'Flutter' },
      { id: '5', name: 'Mobile' },
      { id: '6', name: 'Dart' },
    ],
    createdAt: new Date('2024-02-01T00:00:00Z'),
    updatedAt: new Date('2024-08-18T00:00:00Z'),
  },
  {
    id: '3',
    title: 'Machine Learning cơ bản với Python',
    thumbnail: '',
    description:
      'Khóa học giới thiệu về Machine Learning sử dụng Python. Học viên sẽ học các thuật toán cơ bản, xử lý dữ liệu và xây dựng mô hình dự đoán thực tế.',
    authorId: '3',
    startDate: '2024-10-01',
    endDate: '2025-02-28',
    regStartDate: '2024-09-01',
    regEndDate: '2024-09-30',
    topicDeadline: '2025-01-31',
    status: true,
    maxGroupMembers: 5,
    topicCount: 18,
    enrollmentCount: 52,
    type: 'ai_ml',
    author: {
      id: '3',
      name: 'Lê Văn C',
      username: 'levanc',
      email: 'levanc@example.com',
      role: 'teacher',
      avatar: '',
      bio: 'Tiến sĩ về Machine Learning với 10 năm nghiên cứu và giảng dạy',
    },
    tags: [
      { id: '7', name: 'Python' },
      { id: '8', name: 'Machine Learning' },
      { id: '9', name: 'AI' },
    ],
    createdAt: new Date('2024-03-01T00:00:00Z'),
    updatedAt: new Date('2024-08-22T00:00:00Z'),
  },
  {
    id: '4',
    title: 'Thiết kế UI/UX chuyên nghiệp',
    thumbnail: '',
    description:
      'Khóa học về thiết kế giao diện người dùng và trải nghiệm người dùng. Học viên sẽ học các nguyên tắc thiết kế, công cụ và quy trình thiết kế hiện đại.',
    authorId: '4',
    startDate: '2024-09-20',
    endDate: '2025-01-20',
    regStartDate: '2024-08-20',
    regEndDate: '2024-09-19',
    topicDeadline: '2024-12-20',
    status: true,
    maxGroupMembers: 4,
    topicCount: 14,
    enrollmentCount: 41,
    type: 'design',
    author: {
      id: '4',
      name: 'Phạm Thị D',
      username: 'phamthid',
      email: 'phamthid@example.com',
      role: 'teacher',
      avatar: '',
      bio: 'Nhà thiết kế UI/UX với 7 năm kinh nghiệm tại các công ty công nghệ hàng đầu',
    },
    tags: [
      { id: '10', name: 'UI/UX' },
      { id: '11', name: 'Design' },
      { id: '12', name: 'Figma' },
    ],
    createdAt: new Date('2024-04-01T00:00:00Z'),
    updatedAt: new Date('2024-08-19T00:00:00Z'),
  },
];
