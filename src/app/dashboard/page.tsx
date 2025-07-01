// app/dashboard/page.tsx or your dashboard route

import { getAllTemplates } from "@/components/auth/utils";
import Template from "@/components/Home/Template";
import DashboardLayout from "@/components/Layout/Dashboard";
import RecentTable from "@/components/molecules/Dashboard/RecentTable";

export default async function Dashboard() {
  const { templates } = await getAllTemplates();
  return (
    <div className="flex w-full text-white bg-[#14191f] h-screen">
      <DashboardLayout>
        <main className="px-6 space-y-1">
          <Template />
          <section className="pt-5">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
              Recent
            </h2>
            <RecentTable templates={templates || []} />
          </section>
        </main>
      </DashboardLayout>
    </div>
  );
}
