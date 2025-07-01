/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { ResumeData, TemplateType } from "./types";
import { useSearchParams } from "next/navigation";
import { getSections } from "./utils";

const TemplateLayout = ({ data }: { data: ResumeData }) => {
  const sectionRefs = useRef<any>({});
  const searchParams = useSearchParams();
  const template = (searchParams.get("template") as TemplateType) || "classic";
  // const id = (searchParams.get("id") as string) || "new";
  const [pageBreaks, setPageBreaks] = useState<any>(null);

  useEffect(() => {
    let accumulatedHeight = 0;
    const pageLimit = 900; // A4 size at 96 DPI
    const breakPoints: string[] = [];

    for (const section of getSections(template, data)) {
      const el = sectionRefs.current[section.id];
      if (!el) continue;

      const height = el.getBoundingClientRect().height;

      if (accumulatedHeight + height > pageLimit) {
        breakPoints.push(section.id);
        accumulatedHeight = 0; // reset for next page
      } else {
        accumulatedHeight += height;
      }
    }

    setPageBreaks(breakPoints); // store the points where a new page should start
  }, []);

  return (
    <div
      className={`w-[794px] mx-auto bg-[#ffffff] text-[#201f1f] font-serif p-8 shadow-lg space-y-6`}
      id="classic-resume"
    >
      {getSections(template, data).map((section) => {
        const shouldBreakBefore = pageBreaks?.includes(section.id);
        return (
          <div key={section.id}>
            {shouldBreakBefore ? (
              <div className="html2pdf__page-break"></div>
            ) : null}
            <div
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
            >
              {section.component}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateLayout;
