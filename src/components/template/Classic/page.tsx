/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { ResumeData } from "../types";
import {
  EducationSection,
  ExperienceSection,
  Header,
  Projects,
  Skills,
  Summary,
} from "./Sections";
import { downloadResumeAsPDF } from "@/utils";

const Classic = ({ data }: { data: ResumeData }) => {
  const sectionRefs = useRef<any>({});
  const [pageBreaks, setPageBreaks] = useState<any>(null);

  useEffect(() => {
    let accumulatedHeight = 0;
    const pageLimit = 1123; // A4 size at 96 DPI
    const breakPoints: string[] = [];

    for (const section of sections) {
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

  const sections = [
    { id: "header", component: <Header data={data} /> },
    { id: "summary", component: <Summary summary={data?.summary || ""} /> },
    {
      id: "experience",
      component: <ExperienceSection experience={data.experience} />,
    },
    { id: "skills", component: <Skills skills={data.skills || []} /> },
    {
      id: "education",
      component: <EducationSection education={data.education} />,
    },
    { id: "projects", component: <Projects projects={data.projects || []} /> },
  ];

  return (
    <div
      className="max-w-3xl mx-auto bg-[#ffffff] text-[#000000] font-serif p-8 shadow-lg border space-y-6"
      id="classic-resume"
    >
      {sections.map((section) => {
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
      <button
        onClick={() => downloadResumeAsPDF("classic-resume", "resume.pdf")}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Print Resume
      </button>
    </div>
  );
};

export default Classic;
