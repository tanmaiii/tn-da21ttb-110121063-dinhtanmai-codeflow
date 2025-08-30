import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let currentLocale: string | null = null;

export function setCurrentLocale(locale: string) {
  currentLocale = locale;
}

export function getCurrentLocale() {
  return currentLocale;
}
