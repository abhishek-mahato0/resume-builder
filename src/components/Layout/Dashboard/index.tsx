import SideNav from "@/components/sidenav";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex">
      <SideNav />
      <div className={` w-auto flex-1 p-6 transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
}
