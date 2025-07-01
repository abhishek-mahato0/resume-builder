import SideNav from "@/components/sidenav";
import { ReactNode } from "react";
import NavBar from "./NavBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex lg:flex-row flex-col h-full overflow-hidden">
      <SideNav />
      <NavBar />
      <div
        className={`w-auto flex-1 lg:p-6 p-2 h-full overflow-y-auto transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
}
