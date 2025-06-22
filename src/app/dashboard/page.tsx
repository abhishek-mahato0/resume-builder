// app/dashboard/page.tsx or your dashboard route

import Template from "@/components/Home/Template";
import DashboardLayout from "@/components/Layout/Dashboard";

const recentBuilds = [
  { id: 101, title: "Frontend Resume", updated: "2025-06-15" },
  { id: 102, title: "Backend Resume", updated: "2025-06-10" },
];

export default async function Dashboard() {
  return (
    <div className="min-h-screen flex w-full text-white">
      <DashboardLayout>
        <main className="px-6 py-8 space-y-12">
          <Template />
          <section>
            <h2 className="text-xl font-semibold mb-4">📁 Recent Builds</h2>
            <div className="space-y-3">
              {recentBuilds.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-[#2e2f31] border border-[#3d3d3f] p-4 rounded-md hover:bg-[#38393c] transition cursor-pointer"
                >
                  <h3 className="text-lg">{resume.title}</h3>
                  <p className="text-sm text-gray-400">
                    Last updated: {resume.updated}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </DashboardLayout>
    </div>
  );
}
