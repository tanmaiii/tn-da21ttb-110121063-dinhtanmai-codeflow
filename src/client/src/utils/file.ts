import { StaticImageData } from "next/image";

/**
 * Chuyển đổi kích thước file thành chuỗi
 * @param size Kích thước file
 * @returns chuỗi kích thước file
 */
export function utils_file_size(size: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(0)} ${units[index]}`;
}

/**
 * Chuyển đổi đối tượng hình ảnh thành chuỗi
 * @param img Đối tượng hình ảnh
 * @returns chuỗi hình ảnh
 */
export const utils_ImageobjectToString = (img: string | StaticImageData) => {
    return typeof img === "object" && "src" in img ? img.src : img || "";
  };