import {
  getAllTemplates,
  getContact,
  getRecentTemplate,
} from "@/components/auth/utils";
import Build from "@/components/molecules/Build";
import { sampleData } from "@/components/template/data";
import { ResumeData } from "@/components/template/types";

const page = async () => {
  const templateInfo = await getRecentTemplate();
  const allTemplate = await getAllTemplates(5);
  if (!templateInfo) {
    const contact = await getContact();
    return <Build contact={contact} allTemplates={allTemplate?.templates} />;
  }
  return (
    <Build
      allTemplates={allTemplate?.templates}
      template={(templateInfo as unknown as ResumeData) || sampleData}
    />
  );
};

export default page;
