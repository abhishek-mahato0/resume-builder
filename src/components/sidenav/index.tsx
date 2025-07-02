/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useState } from "react";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import { CiSettings } from "react-icons/ci";
import { FaListUl, FaRegFile } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import { IoMdLogOut } from "react-icons/io";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { templates } from "../template/data";
import AccordionData from "./AccordionData";
import { UserInfo } from "@prisma/client";

type OptionItem = {
  id: number;
  name: string;
  link: string;
  icon: React.ReactNode;
  options?: Record<string, any>[]; // Assuming options are of type ResumeData
};

export default function SideNav({
  hasOptions = false,
  recentResume,
}: {
  hasOptions?: boolean;
  recentResume?: UserInfo[] | null;
}) {
  const { data: session } = useSession();
  const [isCollapsed, setisCollapsed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const renderOptions = (item: OptionItem) => (
    <Link
      href={item.link}
      className={`flex items-center gap-3 px-3 py-2 rounded-full hover:bg-[#1f262d] transition ${
        pathname === item.link ? "bg-[#1b232b] text-white" : "text-gray-400"
      }`}
      key={item.id}
    >
      {item.icon && item.icon}
      <p className="text-white text-sm font-medium leading-normal">
        {item.name}
      </p>
    </Link>
  );

  const sideBarData: OptionItem[] = [
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
      options: recentResume?.map((ele) => ({
        id: ele.id,
        name: ele.title,
        isActive: pathname.includes(ele.id),
        onClick: () =>
          router.push(
            `/build/${ele.id}?${createQueryString(
              "template",
              ele.templateId || "classic"
            )}`
          ),
      })) || [
        {
          id: 1,
          name: "No recent resumes found",
          link: "/my-resumes",
          icon: <FaRegFile />,
        },
      ],
    },
    {
      id: 3,
      name: "Templates",
      icon: <FaListUl />,
      link: "/templates",
      options: templates.map((template) => ({
        id: template.id,
        name: template.title,
        link: `/templates/${template.id}`,
        isActive: searchParams.get("template") === template.value,
        onClick: () =>
          router.push(
            pathname + "?" + createQueryString("template", template.value)
          ),
      })),
    },
    {
      id: 4,
      name: "Settings",
      icon: <CiSettings className="text-2xl" />,
      link: "/settings",
    },
  ];

  return (
    <div
      className={`transition-all duration-300 ease-in-out h-screen text-white lg:flex hidden flex-col relative py-6 ${
        isCollapsed ? "w-12 bg-transparent" : "w-[20%] bg-[#14191f]"
      }`}
    >
      <div className="flex items-center justify-between px-4 pb-4">
        {!isCollapsed && <h1 className="text-xl font-bold">Resume.io</h1>}
        <div
          className="text-gray-400 text-2xl cursor-pointer ml-auto"
          onClick={() => setisCollapsed((prev) => !prev)}
        >
          {isCollapsed ? (
            <TbLayoutSidebarLeftExpandFilled />
          ) : (
            <TbLayoutSidebarLeftCollapseFilled />
          )}
        </div>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col w-full">
          <div className="flex h-[calc(100vh-60px)] flex-col justify-between p-4">
            <div className="flex h-full flex-col gap-4 relative">
              <div className="flex h-[80%] flex-col gap-4 overflow-y-auto">
                {sideBarData.map((item) =>
                  hasOptions && item.options ? (
                    <AccordionData key={item.id} item={item} />
                  ) : (
                    renderOptions(item)
                  )
                )}
              </div>
              <div className="flex w-full items-center justify-between absolute bottom-0 left-0 right-0 px-3 py-2">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="User Avatar"
                    className="rounded-full w-[40px] h-[40px]"
                  />
                ) : (
                  <div className="rounded-full bg-red-500 text-white">
                    {getInitials(session?.user?.name || "")}
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="text-white text-sm font-medium">
                    {session?.user?.name || "Guest User"}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {session?.user?.email}
                  </p>
                </div>
                <IoMdLogOut
                  className="text-2xl cursor-pointer"
                  onClick={async () => signOut()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
