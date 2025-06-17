"use client"
import Sidebar from "@/components/sidebar";
import Classic from "@/components/template/Classic/page";
import { sampleData } from "@/components/template/data";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full gap-4">
      <div className="w-[70%]">
        <Classic data={sampleData} />
      </div>
      <Sidebar
        sampleData={sampleData}
        onDataChange={(data) => {
          console.log("data", data);
        }}
      />
    </div>
  );
};

export default page;
