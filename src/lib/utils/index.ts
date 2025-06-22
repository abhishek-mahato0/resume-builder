/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const getTitle = (key: string) => {
  const texts = key.split("-");
  return texts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const downloadResumeAsPDF = async (
  elementId: string,
  fileName = "resume.pdf"
) => {
  try {
    const input = document.getElementById(elementId);
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const imgProps = pdf.getImageProperties(imgData);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let position = 0;
    let heightLeft = pdfHeight;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.height;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.height;
    }
    console.log("PDF generated successfully");
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
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
