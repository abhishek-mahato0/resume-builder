import Template from "@/components/Home/Template";
import DashboardLayout from "@/components/Layout/Dashboard";
import React from "react";

export default function page() {
  return (
    <div className=" w-full min-h-screen bg-[#14191f]">
      <DashboardLayout>
        <Template />
      </DashboardLayout>
    </div>
  );
}
