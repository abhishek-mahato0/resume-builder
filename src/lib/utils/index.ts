/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import html2pdf from "html2pdf.js";

export const getTitle = (key: string) => {
  const texts = key.split("-");
  return texts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const downloadResumeAsPDF = async (
  elementId: string,
  fileName = "resume.pdf"
) => {
  try {
    const input = document.getElementById(elementId);
    if (!input) return false;

    const canvas = await html2canvas(input, { scale: 2 });
    const pdf = new jsPDF({
      format: "a4",
      unit: "pt",
      orientation: "portrait",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();   // pt
    const pageHeight = pdf.internal.pageSize.getHeight(); // pt

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const scale = pageWidth / canvasWidth; // fit width to page
    const scaledPageHeight = pageHeight / scale; // in canvas units

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    // Step 1: Find all break markers
    const breakMarkers = Array.from(
      input.querySelectorAll(".page-break-marker")
    ) as HTMLElement[];

    const breakOffsets = breakMarkers.map((el) => el.offsetTop);
    breakOffsets.push(canvasHeight); // last chunk

    let prevOffset = 0;

    for (let i = 0; i < breakOffsets.length; i++) {
      const currOffset = breakOffsets[i];
      const sliceHeight = currOffset - prevOffset;

      // create temporary canvas slice
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvasWidth;
      sliceCanvas.height = sliceHeight;

      const sliceCtx = sliceCanvas.getContext("2d");
      if (!sliceCtx) continue;

      // ✅ use drawImage instead of getImageData / putImageData
      sliceCtx.drawImage(
        canvas,
        0,
        prevOffset,
        canvasWidth,
        sliceHeight,
        0,
        0,
        canvasWidth,
        sliceHeight
      );

      const imgData = sliceCanvas.toDataURL("image/png");

      if (i > 0) pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pageWidth,
        sliceHeight * scale
      );

      prevOffset = currOffset;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("PDF generation error:", error);
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





export const downloadPDF2 = (elementId: string, fileName = "resume.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) return;

  html2pdf()
    .set({
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .save();
};
