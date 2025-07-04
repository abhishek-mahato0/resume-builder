/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Sidebar from "@/components/sidebar";
import SideNav from "@/components/sidenav";
import { sampleData } from "@/components/template/data";
import TemplateLayout from "@/components/template/page";
import {
  ResumeData,
  TemplateProps,
  TemplateType,
  UserContact,
} from "@/components/template/types";
import React, { Suspense, useEffect, useRef, useState } from "react";
import LoadingSkeleton from "./Loading";
import { UserInfo } from "@prisma/client";
import { getSections } from "@/components/template/utils";
import { useSearchParams } from "next/navigation";

const Build = ({
  template,
  contact,
  allTemplates,
}: {
  template?: ResumeData | null;
  contact?: UserContact | null;
  allTemplates?: UserInfo[] | null;
}) => {
  const searchParams = useSearchParams();
  const activeTemplate =
    (searchParams.get("template") as TemplateType) || "classic";
  const [resumeData, setResumeData] = useState<ResumeData | null>();
  const [initialData, setInitialData] = useState<ResumeData>(sampleData);
  const [isDownloading, setIsDownloading] = useState(false);
  const sectionRefs = useRef<any>({});
  const [pageBreaks, setPageBreaks] = useState<any>(null);

  useEffect(() => {
    if (!template) return;

    const { id, userId, createdDate, templateId, ...cleanedTemplate } =
      template;
    setInitialData(cleanedTemplate);
  }, [template]);

  useEffect(() => {
    if (!contact) return;
    setInitialData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        email: contact?.email ?? prev.contact.email ?? "",
        phone: contact?.phone ?? prev.contact.phone ?? "",
        website: contact?.website ?? prev.contact.website ?? "",
        linkedin: contact?.linkedin ?? prev.contact.linkedin ?? "",
        github: contact?.github ?? prev.contact.github ?? "",
        twitter: contact?.twitter ?? prev.contact.twitter ?? "",
      },
      name: contact?.name ?? prev.name ?? "",
    }));
  }, [contact]);

  useEffect(() => {
    if (!resumeData) return;
    const pageLimit = 900; // 1 page height
    const threshold30 = pageLimit * 0.3; // 90% of page

    let accumulatedHeight = 0;
    const breakPoints: string[] = [];

    for (const section of getSections(activeTemplate, resumeData)) {
      const el = sectionRefs.current[section.id];
      if (!el) continue;

      const height = el.getBoundingClientRect().height;
      const totalHeight = accumulatedHeight + height;

      // D: Normal case — fits inline
      if (totalHeight > pageLimit && height > threshold30) {
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
  }, [resumeData, activeTemplate]);

  return (
    <div className="flex w-full lg:h-screen lg:flex-row flex-col lg:overflow-hidden overflow-y-auto">
      <SideNav hasOptions={true} recentResume={allTemplates} />
      <Suspense fallback={<LoadingSkeleton />}>
        <div
          className={`transition-all duration-300 ease-in-out flex-1 lg:w-auto w-full overflow-y-scroll`}
        >
          {resumeData ? (
            <TemplateLayout
              ref={sectionRefs}
              pageBreaks={pageBreaks}
              data={resumeData}
            />
          ) : (
            <div className="h-full bg-gray-800 flex items-center justify-center text-white">
              No data yet.
            </div>
          )}
        </div>
      </Suspense>
      <Sidebar sampleData={initialData} onDataChange={setResumeData} />
    </div>
  );
};

export default Build;
