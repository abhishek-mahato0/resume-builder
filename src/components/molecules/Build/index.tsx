/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Sidebar from "@/components/sidebar";
import SideNav from "@/components/sidenav";
import { sampleData } from "@/components/template/data";
import TemplateLayout from "@/components/template/page";
import { ResumeData, UserContact } from "@/components/template/types";
import React, { Suspense, useEffect, useState } from "react";
import LoadingSkeleton from "./Loading";

const Build = ({
  template,
  contact,
}: {
  template?: ResumeData | null;
  contact?: UserContact | null;
}) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(sampleData);
  const [initialData, setInitialData] = useState<ResumeData | null>(sampleData);

  // useEffect(() => {
  //   console.log("Build component mounted", template, contact);
  //   if (!template && !contact) {
  //     setResumeData(sampleData);
  //     return;
  //   }
  //   if (template) {
  //     const { id, userId, createdDate, templateId, ...cleanedTemplate } =
  //       template;
  //     setInitialData(cleanedTemplate);
  //     return;
  //   } else if (contact) {
  //     setInitialData((prev) => {
  //       if (!prev) return null;
  //       return {
  //         ...prev,
  //         contact: {
  //           ...prev.contact,
  //           email: contact?.email ?? prev.contact.email ?? "",
  //           phone: contact?.phone ?? prev.contact.phone ?? "",
  //           website: contact?.website ?? prev.contact.website ?? "",
  //           linkedin: contact?.linkedin ?? prev.contact.linkedin ?? "",
  //           github: contact?.github ?? prev.contact.github ?? "",
  //           twitter: contact?.twitter ?? prev.contact.twitter ?? "",
  //         },
  //         name: contact?.name ?? prev.name ?? "",
  //       };
  //     });
  //     return;
  //   } else {
  //     setInitialData(initialData);
  //   }
  // }, [template, contact]);
  useEffect(() => {
    if (!template && !contact) return;
    if (template) {
      const { id, userId, createdDate, templateId, ...cleanedTemplate } =
        template;
      setInitialData(cleanedTemplate);
      return;
    }
  }, [template, contact]);

  return (
    <div className="flex w-full lg:h-screen lg:flex-row flex-col lg:overflow-hidden overflow-y-auto">
      <SideNav hasOptions={true} />
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
      <Sidebar
        sampleData={resumeData || sampleData}
        onDataChange={(data) => setResumeData(data)}
      />
    </div>
  );
};

export default Build;
