import { getAllTemplates } from "@/components/auth/utils";
import DashboardLayout from "@/components/Layout/Dashboard";
import RecentTable from "@/components/molecules/Dashboard/RecentTable";
import React from "react";

const page = async () => {
  const { templates } = await getAllTemplates();
  return (
    <div className=" w-full h-full bg-[#14191f]">
      <DashboardLayout>
        <div className="flex flex-col gap-4 items-center h-full">
          <p className="text-white tracking-light lg:text-[32px] text-[22px] font-bold leading-tight">
            Your Recent Resume List
          </p>
          <div className="w-full">
            <RecentTable templates={templates || []} />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default page;
