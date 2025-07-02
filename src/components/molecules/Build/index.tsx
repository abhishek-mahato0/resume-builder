/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Sidebar from "@/components/sidebar";
import SideNav from "@/components/sidenav";
import { sampleData } from "@/components/template/data";
import TemplateLayout from "@/components/template/page";
import { ResumeData, TemplateProps, UserContact } from "@/components/template/types";
import React, { Suspense, useEffect, useState } from "react";
import LoadingSkeleton from "./Loading";
import { UserInfo } from "@prisma/client";

const Build = ({
  template,
  contact,
  allTemplates,
}: {
  template?: ResumeData | null;
  contact?: UserContact | null;
  allTemplates?: UserInfo[] | null;
}) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>();
  const [initialData, setInitialData] = useState<ResumeData>(sampleData);

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

  return (
    <div className="flex w-full lg:h-screen lg:flex-row flex-col lg:overflow-hidden overflow-y-auto">
      <SideNav hasOptions={true} recentResume={allTemplates} />
      <Suspense fallback={<LoadingSkeleton />}>
        <div
          className={`transition-all duration-300 ease-in-out flex-1 lg:w-auto w-full overflow-y-scroll`}
        >
          {resumeData ? (
            <TemplateLayout data={resumeData} />
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
