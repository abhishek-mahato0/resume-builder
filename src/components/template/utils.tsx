import {
  ClassicEducationSection,
  ClassicExperienceSection,
  ClassicHeader,
  ClassicProjects,
  ClassicSkills,
  ClassicSummary,
} from "./Classic";

import {
  ModernEducation,
  ModernExperience,
  ModernHeader,
  ModernProjects,
  ModernSkills,
  ModernSummary,
} from "./modern";
import { ResumeData, TemplateType } from "./types";

export const getSectionComponents = (template: TemplateType, data: ResumeData) => {
  const components = {
    classic: {
      header: <ClassicHeader data={data} />,
      summary: <ClassicSummary summary={data.summary || ""} />,
      experience: <ClassicExperienceSection experience={data.experience} />,
      education: <ClassicEducationSection education={data.education} />,
      skills: <ClassicSkills skills={data.skills || []} title="Skills" />,
      language: <ClassicSkills skills={data.language || []} title="Language" />,
      projects: <ClassicProjects projects={data.projects || []} />,
    },
    modern: {
      header: <ModernHeader data={data} />,
      summary: <ModernSummary summary={data.summary || ""} />,
      experience: <ModernExperience experience={data.experience} />,
      education: <ModernEducation education={data.education} />,
      skills: <ModernSkills skills={data.skills || []} title="Skills" />,
      language: <ModernSkills skills={data.language || []} title="Language" />,
      projects: <ModernProjects projects={data.projects || []} />,
    },
  };

  return components[template];
};

export const getSections = (template: TemplateType, data: ResumeData) => {
  const componentMap = getSectionComponents(template, data);

  return [
    { id: "header", component: componentMap.header },
    { id: "summary", component: componentMap.summary },
    { id: "experience", component: componentMap.experience },
    { id: "skills", component: componentMap.skills },
    { id: "language", component: componentMap.language },
    { id: "education", component: componentMap.education },
    { id: "projects", component: componentMap.projects },
  ];
};
