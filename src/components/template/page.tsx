/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { ResumeData, TemplateType } from "./types";
import { useSearchParams } from "next/navigation";
import { getSections } from "./utils";

const Classic = ({ data }: { data: ResumeData }) => {
  const sectionRefs = useRef<any>({});
  const searchParams = useSearchParams();
  const template = (searchParams.get("template") as TemplateType) || "classic";
  const id = (searchParams.get("id") as string) || "new";
  const [pageBreaks, setPageBreaks] = useState<any>(null);

  useEffect(() => {
    let accumulatedHeight = 0;
    const pageLimit = 1123; // A4 size at 96 DPI
    const breakPoints: string[] = [];

    for (const section of getSections(template, data)) {
      const el = sectionRefs.current[section.id];
      if (!el) continue;

      const height = el.getBoundingClientRect().height;

      if (accumulatedHeight + height > pageLimit) {
        breakPoints.push(section.id);
        accumulatedHeight = height; // reset for next page
      } else {
        accumulatedHeight += height;
      }
    }

    setPageBreaks(breakPoints); // store the points where a new page should start
  }, []);

  return (
    <div
      className="max-w-3xl mx-auto bg-[#ffffff] text-[#000000] font-serif p-8 shadow-lg border space-y-6"
      id="classic-resume"
    >
      {getSections(template, data).map((section) => {
        const shouldBreakBefore = pageBreaks?.includes(section.id);
        return (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
            className={shouldBreakBefore ? "page-break" : ""}
          >
            {section.component}
          </div>
        );
      })}
    </div>
  );
};

export default Classic;
