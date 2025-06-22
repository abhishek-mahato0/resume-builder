/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Sidebar from "@/components/sidebar";
import SideNav from "@/components/sidenav";
import { sampleData } from "@/components/template/data";
import TemplateLayout from "@/components/template/page";
import { ResumeData, UserContact } from "@/components/template/types";
import React, { useEffect, useState } from "react";

const Build = ({
  template,
  contact,
}: {
  template?: ResumeData | null;
  contact?: UserContact | null;
}) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [initialData, setInitialData] = useState<ResumeData | null>(sampleData);

  useEffect(() => {
    if (template) {
      const { id, userId, createdDate, templateId, ...cleanedTemplate } =
        template;
      setInitialData(cleanedTemplate);
    } else if (contact) {
      setInitialData((prev) => {
        if (!prev) return null;
        return {
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
        };
      });
    } else {
      setInitialData(initialData);
    }
  }, [template, contact]);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SideNav />
      <div
        className={`transition-all duration-300 ease-in-out flex-1 w-auto overflow-y-scroll`}
      >
        {resumeData ? (
          <TemplateLayout data={resumeData} />
        ) : (
          <div className="h-full bg-gray-800 flex items-center justify-center text-white">
            No data yet.
          </div>
        )}
      </div>
      <Sidebar
        sampleData={initialData || sampleData}
        onDataChange={setResumeData}
      />
    </div>
  );
};

export default Build;
