"use client";
import React, { useState } from "react";
import { TiHomeOutline } from "react-icons/ti";
import { CiSettings } from "react-icons/ci";
import { FaListUl, FaRegFile } from "react-icons/fa";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Link from "next/link";

const sideBarData = [
  {
    id: 1,
    name: "Dashboard",
    icon: <TiHomeOutline />,
    link: "/dashboard",
  },
  {
    id: 2,
    name: "My Resumes",
    icon: <FaRegFile />,
    link: "/my-resumes",
  },
  {
    id: 3,
    name: "Templates",
    icon: <FaListUl />,
    link: "/templates",
  },
  {
    id: 4,
    name: "Settings",
    icon: <CiSettings className="text-2xl" />,
    link: "/settings",
  },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="lg:hidden sticky top-0 z-50 bg-[#14191f] text-white shadow-md px-4 py-2 flex items-center justify-between">
        <h1 className="text-xl font-bold">Resume.io</h1>
        <button onClick={() => setIsOpen(true)}>
          <HiOutlineMenu className="text-2xl" />
        </button>
      </div>

      {/* Slide Down Modal */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full bg-[#1b232b] text-white shadow-lg z-[9999] animate-slideDown">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h2 className="text-lg font-semibold">Resume.io</h2>
            <button onClick={() => setIsOpen(false)}>
              <HiX className="text-2xl" />
            </button>
          </div>

          <div className="flex flex-col space-y-2 p-4">
            {sideBarData.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                onClick={() => setIsOpen(false)} // close modal after click
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#2a2f36] transition"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
