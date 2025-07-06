import Navbar from "@/components/Navbar";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#14191f] dark group/design-root overflow-x-hidden overflow-hidden">
      <Navbar />
      <div className="flex w-full items-center flex-col h-[calc(100vh-64px)] px-4 lg:px-0">
        {children}
      </div>
    </div>
  );
}
