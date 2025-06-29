import { getContact, getRecentTemplate } from "@/components/auth/utils";
import Build from "@/components/molecules/Build";
import { ResumeData } from "@/components/template/types";

const page = async () => {
  const templateInfo = await getRecentTemplate();
  if (!templateInfo) {
    const contact = await getContact();
    return <Build contact={contact} />;
  }
  return <Build template={templateInfo as unknown as ResumeData} />;
};

export default page;
