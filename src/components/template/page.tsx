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
  const [pageBreaks, setPageBreaks] = useState<any>(null);

  useEffect(() => {
    const pageLimit = 850; // 1 page height
    const threshold90 = pageLimit * 0.9; // 90% of page

    let accumulatedHeight = 0;
    const breakPoints: string[] = [];

    for (const section of getSections(template, data)) {
      const el = sectionRefs.current[section.id];
      if (!el) continue;

      const height = el.getBoundingClientRect().height;
      const totalHeight = accumulatedHeight + height;

      // D: Normal case — fits inline
      if (height > threshold90) {
        breakPoints.push(section.id);
        accumulatedHeight = height;
      } else if (totalHeight > pageLimit) {
        breakPoints.push(section.id);
        accumulatedHeight = height;
      } else {
        accumulatedHeight += height;
      }
    }

    setPageBreaks(breakPoints);
  }, []);

  console.log(pageBreaks);

  return (
    <div
      className={`w-[794px] mx-auto bg-[#ffffff] text-[#201f1f] font-serif p-8 shadow-lg space-y-4`}
      id="classic-resume"
    >
      {getSections(template, data).map((section, idx) => {
        const shouldBreakBefore = pageBreaks?.includes(section.id);
        return (
          <div key={section.id + idx}>
            {shouldBreakBefore ? (
              <div className="html2pdf__page-break"></div>
            ) : null}
            <div
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
              className={`${shouldBreakBefore ? "mt-3" : ""}`}
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
