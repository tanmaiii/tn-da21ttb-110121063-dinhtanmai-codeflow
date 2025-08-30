import { ENUM_TYPE_COURSE } from '@/data/enum';
import { logger } from './logger';

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

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

export const reposName = ({ type, name, groupName }: { type: ENUM_TYPE_COURSE; name: string; groupName?: string }) => {
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

export const getStartLinePullRequest = (diffHeader: string) => {
  const match = diffHeader.match(/\@\@ -\d+,\d+ \+(\d+),?/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
};

export function formatUnifiedDiffWithLineNumbers(diff: string): string {
  const lines = diff.split('\n');
  const result: string[] = [];
  let oldLine = 0;
  let newLine = 0;

  for (const line of lines) {
    const hunkMatch = line.match(/^@@ -(\d+),\d+ \+(\d+),\d+ @@/);
    if (hunkMatch) {
      oldLine = parseInt(hunkMatch[1]);
      newLine = parseInt(hunkMatch[2]);
      result.push(line); // keep the @@ header
      continue;
    }

    if (line.startsWith('-')) {
      result.push(`${oldLine}: ${line}`);
      oldLine++;
    } else if (line.startsWith('+')) {
      result.push(`${newLine}: ${line}`);
      newLine++;
    } else if (line.startsWith(' ')) {
      result.push(`${oldLine}: ${line}`);
      oldLine++;
      newLine++;
    } else {
      // fallback
      result.push(line);
    }
  }

  return result.join('\n');
}
