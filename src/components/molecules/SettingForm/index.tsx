"use client";
import { saveSettings } from "@/components/auth/utils";
import { UserContact } from "@/components/template/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const formSections = [
  { label: "Name", name: "name", placeholder: "Your name", type: "text" },
  { label: "Email", name: "email", placeholder: "Email", type: "email" },
  { label: "Phone", name: "phone", placeholder: "Phone", type: "text" },
  {
    label: "Website",
    name: "website",
    placeholder: "Website",
    type: "url",
  },
  {
    label: "LinkedIn",
    name: "linkedin",
    placeholder: "LinkedIn",
    type: "url",
  },
  { label: "GitHub", name: "github", placeholder: "GitHub", type: "url" },
];

const SettingForm = ({ user }: { user: UserContact }) => {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const res = await saveSettings(formData);
    if ("error" in res && typeof res.error === "string") {
      toast.error(res.error);
    }
    if ("id" in res) {
      toast.success("Settings saved successfully!");
      router.refresh();
    }
  };
  return (
    <form
      action={handleSubmit}
      className="layout-content-container flex flex-col w-full justify-start items-center py-5 flex-1 h-full"
    >
      <h2 className="text-white tracking-light lg:text-[28px] text-[22px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Your Resume Settings
      </h2>
      <p className="text-gray-500 text-center px-2">
        These informations will be used while creating a new resume.
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4 px-4 w-full lg:w-[95%] mt-4 py-3">
        {formSections.map((field) => (
          <label key={field.name} className={`flex flex-col flex-1 w-full`}>
            <span className="text-white text-base font-medium leading-normal pb-2">
              {field.label}
            </span>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={
                  user?.[field.name as keyof UserContact]?.toString() ||
                  field.placeholder
                }
                className="form-textarea resize-none h-24 overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3540] focus:border-none placeholder:text-[#9dacbe] p-4 text-base font-normal leading-normal"
              />
            ) : (
              <input
                name={field.name}
                placeholder={
                  user?.[field.name as keyof UserContact]?.toString() ||
                  field.placeholder
                }
                type={field.type}
                className="form-input h-14 overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3540] focus:border-none placeholder:text-[#9dacbe] p-4 text-base font-normal leading-normal"
              />
            )}
          </label>
        ))}
      </div>
      <div className="flex px-4 items-center justify-end py-3 mt-4">
        <button
          type="submit"
          className="flex w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-white text-[#14191f] text-base font-bold leading-normal tracking-[0.015em]"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SettingForm;
