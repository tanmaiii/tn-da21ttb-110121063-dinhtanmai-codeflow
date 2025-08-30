import { ENUM_TYPE_COURSE } from '@/constants/enum';
import { IStatusObj } from '@/constants/object';
import { IComment } from '@/interfaces/comment';
import { IconCheck, IconClock, IconX } from '@tabler/icons-react';

export function util_length_comment(comments: IComment[]): number {
  return comments.length > 0
    ? comments.reduce((total: number, comment: IComment) => {
        // Count this comment
        let count = 1;
        // Add counts of nested replies if any
        if (comment.replies?.length) {
          count += comment.replies.length;
          // Recursively count deeper nested replies
          comment.replies.forEach((nestedReply: IComment) => {
            if (nestedReply.replies?.length) {
              count += nestedReply.replies.length;
            }
          });
        }
        return total + count;
      }, 0)
    : 0;
}

export function util_remove_html_tags(content: string): string {
  return content.replace(/<[^>]*>?/g, '');
}

/**
 * Tính thời gian đọc của bài viết dựa theo độ dài của bài viết
 * @param content Nội dung bài viết
 * @returns Thời gian đọc ước tính (phút)
 */
export function util_CalculateReadingTime(content: string): number {
  // Giả sử tốc độ đọc trung bình là 200 từ/phút
  const WORDS_PER_MINUTE = 200;

  // Đếm số từ trong nội dung
  const wordCount = content.trim().split(/\s+/).length;

  // Tính thời gian đọc
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);

  // Trả về ít nhất 1 phút nếu nội dung quá ngắn
  return Math.max(1, readingTime);
}

/**
 * Chuyển đổi đối tượng thành mã màu
 * @param obj Đối tượng cần chuyển đổi
 * @returns Mã màu dạng tailwind
 */
export function util_object_to_color(obj: IStatusObj) {
  let hash = 0;
  for (let i = 0; i < obj.value.length; i++) {
    hash = obj.value.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Define color schemes
  const colorSchemes = {
    red: {
      icon: IconX,
      bg: 'bg-red-600/10 dark:bg-red-600/20',
      bgHover: 'hover:bg-red-600/10',
      text: 'text-red-500',
      dot: 'bg-red-500',
    },
    green: {
      icon: IconCheck,
      bg: 'bg-green-600/10 dark:bg-green-600/20',
      bgHover: 'hover:bg-green-600/10',
      text: 'text-green-500',
      dot: 'bg-green-500',
    },
    blue: {
      icon: IconClock,
      bg: 'bg-blue-600/10 dark:bg-blue-600/20',
      bgHover: 'hover:bg-blue-600/10',
      text: 'text-blue-500',
      dot: 'bg-blue-500',
    },
    yellow: {
      icon: IconClock,
      bg: 'bg-yellow-600/10 dark:bg-yellow-600/20',
      bgHover: 'hover:bg-yellow-600/10',
      text: 'text-yellow-500',
      dot: 'bg-yellow-500',
    },
    amber: {
      icon: IconClock,
      bg: 'bg-amber-600/10 dark:bg-amber-600/20',
      bgHover: 'hover:bg-amber-600/10',
      text: 'text-amber-500',
      dot: 'bg-amber-500',
    },
    orange: {
      icon: IconClock,
      bg: 'bg-orange-600/10 dark:bg-orange-600/20',
      bgHover: 'hover:bg-orange-600/10',
      text: 'text-orange-500',
      dot: 'bg-orange-500',
    },
    purple: {
      icon: IconClock,
      bg: 'bg-purple-600/10 dark:bg-purple-600/20',
      bgHover: 'hover:bg-purple-600/10',
      text: 'text-purple-500',
      dot: 'bg-purple-500',
    },
    slate: {
      icon: IconClock,
      bg: 'bg-slate-600/10 dark:bg-slate-600/20',
      bgHover: 'hover:bg-slate-600/10',
      text: 'text-slate-500',
      dot: 'bg-slate-500',
    },
  };

  // Map statuses to color schemes
  const statusColorMap: Record<string, keyof typeof colorSchemes> = {
    // Red group
    rejected: 'red',
    hidden: 'red',

    // Red variant group
    failed: 'red',
    failure: 'red',
    error: 'red',
    closed: 'red',

    // Green group
    approved: 'green',
    visible: 'green',
    user: 'green',
    merged: 'green',

    // Green variant group
    success: 'green',

    // Blue group
    'in progress': 'blue',
    admin: 'blue',
    open: 'blue',

    // Yellow group
    teacher: 'yellow',

    // Yellow variant group
    running: 'yellow',

    // Special cases
    pending: 'amber',
    suggest: 'orange',
    custom: 'purple',
    completed: 'amber',

    not_started: 'yellow',
    registering: 'orange',
    started: 'blue',
    finished: 'green',

    [ENUM_TYPE_COURSE.MAJOR]: 'blue',
    [ENUM_TYPE_COURSE.FOUNDATION]: 'green',
    [ENUM_TYPE_COURSE.ELECTIVE]: 'yellow',
    [ENUM_TYPE_COURSE.THESIS]: 'purple',
  };

  const normalizedStr = obj.value.toLowerCase().trim();
  const colorScheme = statusColorMap[normalizedStr];

  return colorScheme ? colorSchemes[colorScheme] : colorSchemes.slate;
}

/**
 * Format số thông báo để hiển thị "9+" nếu lớn hơn 9
 * @param count - Số lượng thông báo
 * @returns Chuỗi đã format (ví dụ: "5", "9+")
 */
export function util_format_number(count: number, max: number = 9): string {
  return count > max ? `${max}+` : count.toString();
}

/**
 * Remove Vietnamese diacritics and special characters, convert to lowercase
 * @param str - Input string with Vietnamese diacritics
 * @returns Clean string without diacritics and special characters
 */
export const removeVietnameseDiacritics = (str: string): string => {
  return str
    .normalize('NFD') // Tách ký tự và dấu (e.g., "ế" -> "e + ́")
    .replace(/[\u0300-\u036f]/g, '') // Xoá dấu
    .replace(/đ/g, 'd') // Chuyển đ -> d
    .replace(/Đ/g, 'd') // Chuyển Đ -> d
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Xoá ký tự đặc biệt
    .replace(/\s+/g, ''); // Xoá khoảng trắng
};

/**
 * Clean special characters like \n, \r, \t, and other control characters from string
 * @param str - Input string that may contain special characters
 * @returns Clean string without special characters
 */
export const cleanSpecialCharacters = (str: string): string => {
  if (!str || typeof str !== 'string') return '';

  return str
    .replace(/[\r\n\t]/g, ' ') // Replace newlines, carriage returns, and tabs with spaces
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading and trailing whitespace
};

/**
 * Format repository name
 * @param type - Type of course
 * @param name - Name of course
 * @param groupName - Group name of course
 * @returns Formatted repository name
 */
export const util_repos_name = ({
  type,
  name,
  groupName,
}: {
  type: ENUM_TYPE_COURSE;
  name: string;
  groupName?: string;
}) => {
  if (!name) {
    throw new Error('Name and groupName are required');
  }
  // Format name and groupName to remove diacritics and special characters
  const formattedName = removeVietnameseDiacritics(name.trim());
  const formattedgroupName = groupName ? removeVietnameseDiacritics(groupName.trim()) : '';

  // type: csn, cn, kl, mh
  let nameRepo = '';

  if (type === ENUM_TYPE_COURSE.MAJOR) {
    nameRepo = `cn-${formattedName}${formattedgroupName ? `-${formattedgroupName}` : ''}`;
  } else if (type === ENUM_TYPE_COURSE.FOUNDATION) {
    nameRepo = `csn-${formattedName}${formattedgroupName ? `-${formattedgroupName}` : ''}`;
  } else if (type === ENUM_TYPE_COURSE.ELECTIVE) {
    nameRepo = `mh-${formattedName}${formattedgroupName ? `-${formattedgroupName}` : ''}`;
  } else if (type === ENUM_TYPE_COURSE.THESIS) {
    nameRepo = `kl-${formattedName}${formattedgroupName ? `-${formattedgroupName}` : ''}`;
  }

  return nameRepo;
};

export const util_chart_generate_color = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  const saturation = 65 + (Math.abs(hash) % 20); // 65-85%
  const lightness = 50 + (Math.abs(hash) % 15); // 50-65%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const util_progress_color = (progress: number): { bg: string; text: string } => {
  if (progress <= 30) {
    return {
      bg: 'bg-green-600/10 dark:bg-green-600/20',
      text: 'bg-green-500/40',
    };
  } else if (progress <= 70) {
    return {
      bg: 'bg-yellow-600/10 dark:bg-yellow-600/20',
      text: 'bg-yellow-500/40',
    };
  } else if (progress <= 99) {
    return {
      bg: 'bg-orange-600/10 dark:bg-orange-600/20',
      text: 'bg-orange-500/40',
    };
  } else {
    return {
      bg: 'bg-gray-600/10 dark:bg-gray-600/20',
      text: 'bg-gray-500/40',
    };
  }
};

/**
 * Format số thành dạng viết tắt (1000 -> 1k, 1500000 -> 1.5M)
 * @param num - Số cần format
 * @param decimals - Số chữ số thập phân (mặc định là 1)
 * @returns Chuỗi đã format (ví dụ: "1k", "1.5M", "2.3B")
 */
export function util_format_number_compact(num: number, decimals: number = 1): string {
  if (num === 0) return '0';
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  const suffixes = ['', 'k', 'M', 'B', 'T'];
  const tier = Math.log10(absNum) / 3 | 0;
  
  if (tier === 0) return sign + absNum.toString();
  
  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = absNum / scale;
  
  // Nếu số nguyên thì không hiển thị phần thập phân
  const formatted = scaled % 1 === 0 
    ? scaled.toString() 
    : scaled.toFixed(decimals).replace(/\.?0+$/, '');
  
  return sign + formatted + suffix;
}

/**
 * Xác định trạng thái khóa học dựa trên các ngày tháng
 * @param startDate - Ngày bắt đầu khóa học
 * @param endDate - Ngày kết thúc khóa học
 * @param regStartDate - Ngày bắt đầu đăng ký (tùy chọn)
 * @param regEndDate - Ngày kết thúc đăng ký (tùy chọn)
 * @returns Trạng thái khóa học: 'registering' | 'not_started' | 'started' | 'finished'
 */
export const util_get_course_status = (
  startDate: string | Date,
  endDate: string | Date,
  regStartDate?: string | Date | null,
  regEndDate?: string | Date | null,
): 'registering' | 'not_started' | 'started' | 'finished' => {
  const now = new Date();
  const courseStartDate = new Date(startDate);
  const courseEndDate = new Date(endDate);

  // Kiểm tra xem có trong thời gian đăng ký không
  if (regStartDate && regEndDate) {
    const registrationStartDate = new Date(regStartDate);
    const registrationEndDate = new Date(regEndDate);

    // Nếu đang trong thời gian đăng ký
    if (now >= registrationStartDate && now <= registrationEndDate) {
      return 'registering';
    }
  }

  // Kiểm tra trạng thái khóa học
  if (now >= courseStartDate && now <= courseEndDate) {
    return 'started';
  } else if (now < courseStartDate) {
    return 'not_started';
  } else {
    return 'finished';
  }
};
