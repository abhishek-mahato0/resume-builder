import React from "react";

const SideNavLoader = () => {
  return (
    <div className="w-[250px] bg-[#1e293b] h-full p-4 flex flex-col gap-4 relative">
      <div className="flex flex-col gap-4 pt-4">
        <div className="h-8 bg-gray-600 rounded w-full" />
        <div className="h-8 bg-gray-700 rounded w-full" />
        <div className="h-8 bg-gray-700 rounded w-full" />
        <div className="h-8 bg-gray-700 rounded w-full" />
        <div className="h-8 bg-gray-700 rounded w-full mt-auto" />
      </div>
      <div className="h-10 bg-gray-600 rounded w-full absolute bottom-10" />
    </div>
  );
};

export default SideNavLoader;
