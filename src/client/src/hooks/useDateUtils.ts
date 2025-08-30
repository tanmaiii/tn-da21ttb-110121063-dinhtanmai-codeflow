import { useTranslations } from 'next-intl';
import { 
  utils_DateToDDMMYYYY,
  utils_DateToDDMonth,
  utils_TimeAgo,
  utils_CalculateWeeks,
  utils_TimeRemaining,
  utils_CalculateProgress,
  utils_IsDateBefore,
  utils_IsDateAfter
} from '@/utils/date';

export const useDateUtils = () => {
  const t = useTranslations();

  return {
    // Original functions without translation
    dateToDDMMYYYY: utils_DateToDDMMYYYY,
    dateToDDMonth: utils_DateToDDMonth,
    timeAgo: utils_TimeAgo,
    calculateWeeks: utils_CalculateWeeks,
    calculateProgress: utils_CalculateProgress,
    isDateBefore: utils_IsDateBefore,
    isDateAfter: utils_IsDateAfter,
    
    // Enhanced function with translation
    timeRemaining: (endDate: string) => utils_TimeRemaining(endDate, t),
  };
}; 