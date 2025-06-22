"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { TemplateProps } from "../template/types";
import { templates } from "../template/data";

const Template = () => {
  // const { data: session } = useSession();
  const router = useRouter();
  const handleTemplateClick = (template: TemplateProps) => {
    // if (!session) {
    //   router.push("?login=true&callbackUrl=/build?template=" + template.value);
    //   return;
    // }
    router.push("/build?template=" + template.value);
  };
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">🎨 Choose a Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="rounded-xl p-4 cursor-pointer transition"
            onClick={() => handleTemplateClick(template)}
          >
            {/* <Image
              src={template.preview}
              alt={template.title}
              width={300}
              height={180}
              className="rounded-lg"
            /> */}
            <h3 className="mt-2 text-gray-400">{template.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Template;
