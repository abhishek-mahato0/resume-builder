"use client"
import Sidebar from "@/components/sidebar";
import { sampleData } from "@/components/template/data";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <Classic data={sampleData} /> */}
      <Sidebar sampleData={sampleData}/>
    </div>
  );
};

export default page;
