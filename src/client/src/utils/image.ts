import apiConfig from "@/lib/api";

export function utils_ApiImageToLocalImage(
  image: string | null | undefined
): string {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${apiConfig.imageUrl(image)}`;
}
