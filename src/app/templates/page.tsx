import Template from "@/components/Home/Template";
import DashboardLayout from "@/components/Layout/Dashboard";
import React from "react";

const page = async () => {
  return (
    <div className=" w-full h-full bg-[#14191f]">
      <DashboardLayout>
        <Template />
      </DashboardLayout>
    </div>
  );
};

export default page;
