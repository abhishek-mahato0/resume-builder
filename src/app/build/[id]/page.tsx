import { getRecentTemplateById } from "@/components/auth/utils";
import Build from "@/components/molecules/Build";
import { ResumeData } from "@/components/template/types";

const page = async ({ params }: { params: { id: string } }) => {
  const templateInfo = await getRecentTemplateById(params.id);
  return <Build template={templateInfo as unknown as ResumeData} />;
};

export default page;
