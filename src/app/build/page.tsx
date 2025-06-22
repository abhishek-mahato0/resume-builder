"use client";
import Sidebar from "@/components/sidebar";
import SideNav from "@/components/sidenav";
import { sampleData } from "@/components/template/data";
import { ResumeData } from "@/components/template/types";
import React, { useState } from "react";
import TemplateLayout from "@/components/template/page";

const Build = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

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
      <Sidebar sampleData={sampleData} onDataChange={setResumeData} />
    </div>
  );
};

export default Build;
