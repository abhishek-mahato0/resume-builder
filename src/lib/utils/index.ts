/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import html2pdf from "html2pdf.js";
import { getBackgroundColor } from "@/components/template/utils";
import { TemplateType } from "@/components/template/types";

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

export const downloadPDF = async (
  elementId: string,
  fileName = "resume.pdf",
  template: TemplateType = "classic"
) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.style.backgroundColor = getBackgroundColor(template);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const opt = {
      margin: [0.5, 0.5],
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      },
      jsPDF: {
        unit: "pt",
        format: "a4",
        orientation: "portrait",
      },
    };

    await html2pdf().from(element).set(opt).save();
    return true;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    return false;
  }
};
