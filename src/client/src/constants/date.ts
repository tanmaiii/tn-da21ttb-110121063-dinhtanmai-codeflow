export const MONTH_NAMES_VI = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MONTH_NAMES_JA = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];

export const MONTH_NAMES_CP = [
  'មករា',
  'កុម្ភៈ',
  'មីនា',
  'មេសា',
  'ឧសភា',
  'មិថុនា',
  'កក្កដា',
  'សីហា',
  'កញ្ញា',
  'តុលា',
  'វិច្ឆិកា',
  'ធ្នូ',
];

export interface ITimeIntervals {
  [key: string]: number;
}

export const TIME_INTERVALS_VI: ITimeIntervals = {
  năm: 31536000,
  tháng: 2592000,
  tuần: 604800,
  ngày: 86400,
  giờ: 3600,
  phút: 60,
  giây: 1,
};

export const TIME_INTERVALS_EN: ITimeIntervals = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

export const TIME_INTERVALS_JA: ITimeIntervals = {
  年: 31536000,
  ヶ月: 2592000,
  週間: 604800,
  日: 86400,
  時間: 3600,
  分: 60,
  秒: 1,
};

export const TIME_INTERVALS_CP: ITimeIntervals = {
  ឆ្នាំ: 31536000,
  ខែ: 2592000,
  សប្តាហ៍: 604800,
  ថ្ងៃ: 86400,
  ម៉ោង: 3600,
  នាទី: 60,
  វិនាទី: 1,
}; 