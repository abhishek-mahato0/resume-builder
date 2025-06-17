"use client";
import Sidebar from "@/components/sidebar";
import SideNav from "@/components/sidenav";
import Classic from "@/components/template/page";
import { sampleData } from "@/components/template/data";
import { ResumeData } from "@/components/template/types";
import React, { useState } from "react";

const Build = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  return (
    <div className="flex w-full gap-4">
      <SideNav />
      <div className="h-[100vh] w-[50%] overflow-y-scroll">
        {resumeData ? (
          <Classic data={resumeData || null} />
        ) : (
          <div className="h-full bg-gray-500">No data yet.</div>
        )}
      </div>
      <Sidebar
        sampleData={sampleData}
        onDataChange={(data) => setResumeData(data)}
      />
    </div>
  );
};

export default Build;
