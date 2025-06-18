// app/dashboard/page.tsx or your dashboard route

"use client";

import Image from "next/image";

const templates = [
  { id: 1, title: "Classic Resume", preview: "/templates/classic.png" },
  { id: 2, title: "Modern Resume", preview: "/templates/modern.png" },
];

const recentBuilds = [
  { id: 101, title: "Frontend Resume", updated: "2025-06-15" },
  { id: 102, title: "Backend Resume", updated: "2025-06-10" },
];

export default function Home() {
  const user = { name: "Abhishek", avatar: "/avatar.png" };

  return (
    <div className="min-h-screen text-white">
      {/* Top Navbar */}
      <nav className="w-full px-6 py-2 border-b border-[#333] flex items-center justify-between bg-black">
        <h1 className="text-xl font-bold text-white">🧑‍💻 Resume Builder</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-300">Hello, {user.name}</p>
          {/* <Image
            src={user.avatar}
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full border border-gray-500"
          /> */}
        </div>
      </nav>

      <main className="px-6 py-8 space-y-12">
        {/* Templates Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🎨 Choose a Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="rounded-xl p-4 cursor-pointer transition"
              >
                <Image
                  src={template.preview}
                  alt={template.title}
                  width={300}
                  height={180}
                  className="rounded-lg"
                />
                <h3 className="mt-2 text-gray-400">{template.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Builds Section */}
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
    </div>
  );
}
