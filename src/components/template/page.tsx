/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { ResumeData, TemplateType } from "./types";
import { useSearchParams } from "next/navigation";
import { getSections } from "./utils";

const TemplateLayout = ({
  data,
  ref,
  pageBreaks,
}: {
  data: ResumeData;
  ref: any;
  pageBreaks: any;
}) => {
  const searchParams = useSearchParams();
  const template = (searchParams.get("template") as TemplateType) || "classic";

  return (
    <div
      className={`w-[794px] overflow-auto mx-auto bg-[#ffffff] text-[#201f1f] font-serif p-8 shadow-lg space-y-4`}
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
                ref.current[section.id] = el;
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
