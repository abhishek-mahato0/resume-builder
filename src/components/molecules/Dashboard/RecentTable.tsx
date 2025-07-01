"use client";
import React from "react";
import Customtable from "../Customtable";
import { templates } from "@/components/template/data";
import { UserInfo } from "@prisma/client";
import { CiEdit } from "react-icons/ci";
import { TbTrash } from "react-icons/tb";
import { deleteTemplate } from "@/components/auth/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const getTemplateName = (templateId: string) => {
  return (
    templates.find((template) => String(template.value) === templateId)
      ?.title || "Unknown Template"
  );
};

const RecentTable = ({ templates }: { templates: UserInfo[] }) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const { error } = await deleteTemplate(id);
    if (!error) {
      toast.success("Template deleted successfully");
      router.refresh();
    } else {
      toast.error("Failed to delete template");
    }
  };
  const recentColumns = [
    {
      id: "title",
      name: "Title",
    },
    {
      id: "updatedAt",
      name: "Last Updated",
      cell: (item: UserInfo) => {
        const date = new Date(item.updatedAt);
        return (
          <div className="flex items-center gap-2">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        );
      },
    },
    {
      id: "template",
      name: "Template",
      cell: (item: UserInfo) => (
        <div className="flex items-center gap-2">
          {getTemplateName(item?.templateId || "")}
        </div>
      ),
    },
    {
      id: "actions",
      name: "Actions",
      cell: (item: UserInfo) => (
        <div className="flex items-center gap-3">
          <button
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() =>
              router.push(`/build/${item.id}?template=${item.templateId}`)
            }
          >
            <CiEdit className="text-xl" />
          </button>
          <button
            className="text-red-500 hover:underline cursor-pointer"
            onClick={handleDelete.bind(null, item.id)}
          >
            <TbTrash className="text-xl" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <Customtable data={templates} header={recentColumns} />
    </div>
  );
};

export default RecentTable;
