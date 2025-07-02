import { getAllTemplates, getRecentTemplateById } from "@/components/auth/utils";
import Build from "@/components/molecules/Build";
import { ResumeData } from "@/components/template/types";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const templateInfo = await getRecentTemplateById(params.id);
  const allTemplate = await getAllTemplates(5);
  if (!templateInfo) redirect("/dashboard");
  return <Build template={templateInfo as unknown as ResumeData} allTemplates={allTemplate?.templates} />;
};

export default page;
