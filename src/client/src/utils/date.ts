import { getCurrentLocale } from '@/lib/utils';
import { 
  MONTH_NAMES_VI, 
  MONTH_NAMES_EN, 
  MONTH_NAMES_JA,
  MONTH_NAMES_CP,
  TIME_INTERVALS_VI, 
  TIME_INTERVALS_EN,
  TIME_INTERVALS_JA,
  TIME_INTERVALS_CP
} from '@/constants/date';

/**
 * Trả về chuỗi ngày tháng năm (Ex: 28-05-2025)
 * @param date Ngày
 * @returns chuỗi ngày tháng năm (Ex: 28-05-2025)
 */
export function utils_DateToDDMMYYYY(date: string | Date): string {
  if (!date) return '...';
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

export function utils_DateToDDMMYYYY_HHMM(date: string | Date): string {
  if (!date) return '...';
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours().toString().padStart(2, '0');
  const minute = dateObj.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}`;
}


/**
 * Trả về chuỗi ngày tháng (Ex: 28 tháng 5)
 * @param date Ngày
 * @returns chuỗi ngày tháng (Ex: 28 tháng 5)
 */
export function utils_DateToDDMonth(
  date: Date,
  locale?: "vi" | "en" | "ja" | "cp"
): string {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  // Sử dụng locale được truyền vào hoặc fallback về 'vi' để đảm bảo consistency
  const currentLocale = locale || getCurrentLocale() || 'vi';

  let month: string;
  switch (currentLocale) {
    case 'en':
      month = MONTH_NAMES_EN[dateObj.getMonth()];
      break;
    case 'ja':
      month = MONTH_NAMES_JA[dateObj.getMonth()];
      break;
    case 'cp':
      month = MONTH_NAMES_CP[dateObj.getMonth()];
      break;
    default:
      month = MONTH_NAMES_VI[dateObj.getMonth()];
  }
  
  return `${day} ${month}`;
}

/**
 * Trả về chuỗi thời gian đã trôi qua (Ex: 1 tuần trước)
 * @param date Ngày
 * @returns chuỗi thời gian đã trôi qua (Ex: 1 tuần trước)
 */
export const utils_TimeAgo = (date: Date | string, locale?: "vi" | "en" | "ja" | "cp"): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  // Sử dụng locale được truyền vào hoặc fallback để đảm bảo consistency
  const currentLocale = locale || getCurrentLocale() || 'vi';

  let intervals: { [key: string]: number };
  switch (currentLocale) {
    case 'en':
      intervals = TIME_INTERVALS_EN;
      break;
    case 'ja':
      intervals = TIME_INTERVALS_JA;
      break;
    case 'cp':
      intervals = TIME_INTERVALS_CP;
      break;
    default:
      intervals = TIME_INTERVALS_VI;
  }

  for (const key in intervals) {
    const interval = intervals[key];
    const count = Math.floor(seconds / interval);

    if (count >= 1) {
      if (currentLocale === 'en') {
        return `${count} ${key}${count > 1 ? 's' : ''}`;
      } else {
        return `${count} ${key}`;
      }
    }
  }

  // Return localized "just now" text
  switch (currentLocale) {
    case 'en':
      return 'just now';
    case 'ja':
      return 'たった今';
    case 'cp':
      return 'ឥឡូវនេះ';
    default:
      return 'vừa xong';
  }
};

/**
 * Trả về số tuần giữa hai ngày (Ex: 1 tuần)
 * @param startDate Ngày bắt đầu
 * @param endDate Ngày kết thúc
 * @returns số tuần giữa hai ngày (Ex: 1 tuần)
 */
export function utils_CalculateWeeks(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const diffTime = Math.abs(end.getTime() - start.getTime());

  // Convert to days and round up to nearest week
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.ceil(diffDays / 7);

  return weeks;
}

/**
 * Trả về chuỗi thời gian còn lại (Ex: Còn 1 ngày 1 giờ)
 * @param endDate Ngày kết thúc
 * @param t Translation function (optional)
 * @returns chuỗi thời gian còn lại (Ex: Còn 1 ngày 1 giờ)
 */
export function utils_TimeRemaining(
  endDate: string, 
  t?: (key: string, params?: Record<string, number>) => string
): string {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const locale = getCurrentLocale() || 'vi';

  // If the end date has passed
  if (diffTime <= 0) {
    if (t) {
      return t('date.ended');
    }
    switch (locale) {
      case 'en':
        return 'Ended';
      case 'ja':
        return '終了';
      case 'cp':
        return 'បានបញ្ចប់';
      default:
        return 'Đã kết thúc';
    }
  }

  // Calculate remaining time
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (t) {
    // Use translation keys
    if (days > 0) {
      return t('date.remaining', { days, hours });
    } else if (hours > 0) {
      return t('date.remainingHours', { hours, minutes });
    } else {
      return t('date.remainingMinutes', { minutes });
    }
  }

  // Fallback to hardcoded text
  if (days > 0) {
    switch (locale) {
      case 'en':
        return `${days} days ${hours} hours remaining`;
      case 'ja':
        return `残り${days}日${hours}時間`;
      case 'cp':
        return `នៅសល់ ${days} ថ្ងៃ ${hours} ម៉ោង`;
      default:
        return `Còn ${days} ngày ${hours} giờ`;
    }
  } else if (hours > 0) {
    switch (locale) {
      case 'en':
        return `${hours} hours ${minutes} minutes remaining`;
      case 'ja':
        return `残り${hours}時間${minutes}分`;
      case 'cp':
        return `នៅសល់ ${hours} ម៉ោង ${minutes} នាទី`;
      default:
        return `Còn ${hours} giờ ${minutes} phút`;
    }
  } else {
    switch (locale) {
      case 'en':
        return `${minutes} minutes remaining`;
      case 'ja':
        return `残り${minutes}分`;
      case 'cp':
        return `នៅសល់ ${minutes} នាទី`;
      default:
        return `Còn ${minutes} phút`;
    }
  }
}

/**
 * Kiểm tra xem ngày thứ nhất có trước ngày thứ hai không
 * @param firstDate Ngày thứ nhất
 * @param secondDate Ngày thứ hai
 * @returns phần trăm tiến độ (Ex: 50%)
 */
export function utils_CalculateProgress(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // Calculate total duration in milliseconds
  const totalDuration = end.getTime() - start.getTime();

  // Calculate elapsed time in milliseconds
  const elapsedTime = now.getTime() - start.getTime();

  // Calculate progress percentage
  let progress = (elapsedTime / totalDuration) * 100;

  // Ensure progress is between 0 and 100
  progress = Math.max(0, Math.min(100, progress));

  return Math.round(progress);
}

/**
 * Kiểm tra xem ngày thứ nhất có trước ngày thứ hai không
 * @param firstDate Ngày thứ nhất
 * @param secondDate Ngày thứ hai
 * @returns true nếu firstDate trước secondDate, false ngược lại
 */
export function utils_IsDateBefore(
  firstDate: Date | null | undefined,
  secondDate: Date | null | undefined,
): boolean {
  // Nếu một trong hai ngày là null hoặc undefined, return false
  if (!firstDate || !secondDate) {
    return false;
  }

  // Chuyển đổi sang Date nếu là string
  const first = firstDate instanceof Date ? firstDate : new Date(firstDate);
  const second = secondDate instanceof Date ? secondDate : new Date(secondDate);

  // So sánh timestamp
  return first.getTime() <= second.getTime();
}

/**
 * Kiểm tra xem ngày thứ nhất có sau ngày thứ hai không
 * @param firstDate Ngày thứ nhất
 * @param secondDate Ngày thứ hai
 * @returns true nếu firstDate sau secondDate, false ngược lại
 */
export function utils_IsDateAfter(
  firstDate: Date | null | undefined,
  secondDate: Date | null | undefined,
): boolean {
  // Nếu một trong hai ngày là null hoặc undefined, return false
  if (!firstDate || !secondDate) {
    return false;
  }

  // Chuyển đổi sang Date nếu là string
  const first = firstDate instanceof Date ? firstDate : new Date(firstDate);
  const second = secondDate instanceof Date ? secondDate : new Date(secondDate);

  // So sánh timestamp
  return first.getTime() >= second.getTime();
}
