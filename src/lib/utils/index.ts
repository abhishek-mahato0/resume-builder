/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const getTitle = (key: string) => {
  const texts = key.split("-");
  return texts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  if (!name) return "";
  const names = name?.split(" ");
  return `${names?.[0]?.[0]}${names?.[1]?.[0]}`;
};
