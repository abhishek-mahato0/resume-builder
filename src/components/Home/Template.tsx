"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { TemplateProps } from "../template/types";
import { templates } from "../template/data";
import { useSession } from "next-auth/react";

const Template = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleTemplateClick = (template: TemplateProps) => {
    if (!session) {
      router.push(`/login?callbackUrl=/build?template=${template.value}`);
      return;
    }
    router.push("/build?template=" + template.value);
  };
  return (
    <section>
      <div className="flex flex-wrap justify-between gap-3">
        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          Resume Templates
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="rounded-xl p-4 cursor-pointer transition flex items-center gap-2 flex-col"
            onClick={() => handleTemplateClick(template)}
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMDlFP5Db0CGLDv8hTumuUnJf_h1hDSAliRI91Luskjwz1f24RkF9Olx3SBQrNf42-fDqNCij0dqGLmjDFKKyhyAW3Y-UhkGk8pyILID9C-ZSAV3BY8nNwtK7yXQKA7sWewmkQ4JgehRhKN1wfJSEm0Ji5jIJtLwOEWstXZevwiat2rrbnl6lJDiQUBJv9R0tUAsxNk8RgSXmmpr2M9T-S6Qpt_IYI6HJHahrhCt1Xzg2VKap-C52-DUSFfKttI0g93fbjUdOvipE")',
              }}
            ></div>

            <h3 className="mt-2 text-gray-400">{template.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Template;
