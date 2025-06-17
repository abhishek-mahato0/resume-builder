/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { ResumeData } from "./types";
import {
  ClassicEducationSection,
  ClassicExperienceSection,
  ClassicHeader,
  ClassicProjects,
  ClassicSkills,
  ClassicSummary,
} from "./Classic";

import {
  ModernEducation,
  ModernExperience,
  ModernHeader,
  ModernProjects,
  ModernSkills,
  ModernSummary,
} from "./modern";
import { useSearchParams } from "next/navigation";

type TemplateType = "classic" | "modern";

const Classic = ({ data }: { data: ResumeData }) => {
  const sectionRefs = useRef<any>({});
  const searchParams = useSearchParams();
  const template = (searchParams.get("template") as TemplateType) || "classic";
  const [pageBreaks, setPageBreaks] = useState<any>(null);

  const getSectionComponents = (template: TemplateType, data: ResumeData) => {
    const components = {
      classic: {
        header: <ClassicHeader data={data} />,
        summary: <ClassicSummary summary={data.summary || ""} />,
        experience: <ClassicExperienceSection experience={data.experience} />,
        education: <ClassicEducationSection education={data.education} />,
        skills: <ClassicSkills skills={data.skills || []} title="Skills" />,
        language: (
          <ClassicSkills skills={data.language || []} title="Language" />
        ),
        projects: <ClassicProjects projects={data.projects || []} />,
      },
      modern: {
        header: <ModernHeader data={data} />,
        summary: <ModernSummary summary={data.summary || ""} />,
        experience: <ModernExperience experience={data.experience} />,
        education: <ModernEducation education={data.education} />,
        skills: <ModernSkills skills={data.skills || []} title="Skills" />,
        language: (
          <ModernSkills skills={data.language || []} title="Language" />
        ),
        projects: <ModernProjects projects={data.projects || []} />,
      },
    };

    return components[template];
  };

  const getSections = (template: TemplateType, data: ResumeData) => {
    const componentMap = getSectionComponents(template, data);

    return [
      { id: "header", component: componentMap.header },
      { id: "summary", component: componentMap.summary },
      { id: "experience", component: componentMap.experience },
      { id: "skills", component: componentMap.skills },
      { id: "language", component: componentMap.language },
      { id: "education", component: componentMap.education },
      { id: "projects", component: componentMap.projects },
    ];
  };

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
