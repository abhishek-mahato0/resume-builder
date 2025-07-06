/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accrodion";
import { usePathname } from "next/navigation";

const AccordionData = ({ item }: { item: any }) => {
  const pathname = usePathname();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-3 py-2 rounded-full hover:bg-[#1f262d] mt-4">
          <div
            className={`flex items-center gap-3 transition ${
              pathname === item.link
                ? "bg-[#1b232b] text-white"
                : "text-gray-400"
            }`}
            key={item.id}
          >
            {item.icon && item.icon}
            <p className="text-white text-sm font-medium leading-normal">
              {item.name}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {item.options && item.options.length > 0 ? (
            <ul className="pl-4">
              {item.options.map((option: any) => (
                <li
                  key={option.id}
                  onClick={() => option.onClick && option.onClick()}
                  className={`py-2 px-4 cursor-pointer ${
                    pathname === option.link ? "text-white" : "text-gray-400"
                  } ${
                    option.isActive ? "bg-[#1b232b] text-whit rounded-full" : ""
                  }`}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No options available</p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionData;
