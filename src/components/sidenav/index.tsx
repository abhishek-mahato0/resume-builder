import React from "react";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";

const SideNav = ({
  isCollapsed,
  onCollapse,
}: {
  isCollapsed: boolean;
  onCollapse: () => void;
}) => {
  return (
    <div
      className={`transition-all duration-300 ease-in-out h-screen  text-white lg:flex hidden flex-col ${
        isCollapsed ? "w-12 bg-transparent" : "w-[20%] bg-black"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {!isCollapsed && <h1 className="text-2xl font-bold">SideNav</h1>}
        <div
          className="text-gray-400 text-2xl cursor-pointer ml-auto"
          onClick={onCollapse}
        >
          {isCollapsed ? (
            <TbLayoutSidebarLeftExpandFilled />
          ) : (
            <TbLayoutSidebarLeftCollapseFilled />
          )}
        </div>
      </div>
      {!isCollapsed && (
        <div className="px-4 mt-4">
          {/* Add nav items here */}
          <p className="text-sm text-gray-300">Dashboard</p>
          <p className="text-sm text-gray-300 mt-2">Templates</p>
        </div>
      )}
    </div>
  );
};

export default SideNav;
