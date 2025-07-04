"use client";
import SideNav from "@/components/sidenav";
import React from "react";

const loading = () => {
  return (
    <div className="flex w-full text-white bg-[#14191f] h-screen animate-pulse">
      <SideNav />
      <div className="w-auto flex gap-4">
        <div className="h-[100px] w-[80px] bg-gray-600 rounded" />
        <div className="h-[100px] w-[80px] bg-gray-600 rounded" />
        <div className="h-[100px] w-[80px] bg-gray-600 rounded" />
        <div className="h-[100px] w-[80px] bg-gray-600 rounded" />
        <div className="h-[100px] w-[80px] bg-gray-600 rounded" />
      </div>
    </div>
  );
};

export default loading;
