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
import { IoMdMail } from "react-icons/io";
import { FaGithub, FaLink, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
  TailoredEducation,
  TailoredExperience,
  TailoredHeader,
  TailoredProjects,
  TailoredSkills,
  TailoredSummary,
} from "./tailored";
import { ColoredEducation, ColoredExperience, ColoredHeader, ColoredProjects, ColoredSkills } from "./coloured";

export const getSectionComponents = (
  template: TemplateType,
  data: ResumeData
) => {
  const components = {
    classic: {
      header: <ClassicHeader data={data} />,
      summary: <ClassicSummary summary={data.summary || ""} />,
      experience: <ClassicExperienceSection experience={data.experience} />,
      education: <ClassicEducationSection education={data.education} />,
      skills: <ClassicSkills skills={data.skills || []} title="Skills" />,
      ...(data.language && data.language.length > 0
        ? {
            language: (
              <ClassicSkills skills={data.language || []} title="Language" />
            ),
          }
        : null),
      projects: <ClassicProjects projects={data.projects || []} />,
    },
    modern: {
      header: <ModernHeader data={data} />,
      summary: <ModernSummary summary={data.summary || ""} />,
      experience: <ModernExperience experience={data.experience} />,
      education: <ModernEducation education={data.education} />,
      skills: <ModernSkills skills={data.skills || []} title="Skills" />,
      ...(data.language && data.language.length > 0
        ? {
            language: (
              <ModernSkills skills={data.language || []} title="Language" />
            ),
          }
        : null),
      projects: <ModernProjects projects={data.projects || []} />,
    },
    tailored: {
      header: <TailoredHeader data={data} />,
      summary: <TailoredSummary summary={data.summary || ""} />,
      experience: <TailoredExperience experience={data.experience} />,
      education: <TailoredEducation education={data.education} />,
      skills: <TailoredSkills skills={data.skills || []} title="Skills" />,
      ...(data.language && data.language.length > 0
        ? {
            language: (
              <TailoredSkills skills={data.language || []} title="Language" />
            ),
          }
        : null),
      projects: <TailoredProjects projects={data.projects || []} />,
    },
    colored: {
      header: <ColoredHeader data={data} />,
      summary:null,
      skills: <ColoredSkills skills={data.skills || []} title="Skills" />,
      experience: <ColoredExperience experience={data.experience} />,
      ...(data.language && data.language.length > 0
        ? { language: <ColoredSkills skills={data.language || []} title="Language" /> }
        : {}),
      education: <ColoredEducation education={data.education} />,  
      projects: <ColoredProjects projects={data.projects || []} />
    }
  };

  return components[template];
};

export const getSections = (template: TemplateType, data: ResumeData) => {
  const componentMap = getSectionComponents(template, data);

  return [
    { id: "header", component: componentMap.header },
    ...(componentMap.summary ? [{ id: "summary", component: componentMap.summary }]: []),
    { id: "experience", component: componentMap.experience },
    { id: "skills", component: componentMap.skills },
    ...(componentMap?.language
      ? [{ id: "language", component: componentMap.language }]
      : []),
    { id: "education", component: componentMap.education },
    { id: "projects", component: componentMap.projects },
  ];
};

const TemplateBGColors: Record<TemplateType, string> = {
  classic: "#ffffff",
  modern: "#f3f4f6",
  tailored: "#f9fafb",
  colored: "#f3f4f6",
};

export const getBackgroundColor = (template: TemplateType) => {
  return TemplateBGColors[template] || TemplateBGColors.classic;
}

export const contactInfo = [
  {
    label: "Email",
    value: "email",
    icon: <IoMdMail />,
  },
  {
    label: "Phone",
    value: "phone",
    icon: <FaPhoneAlt />,
  },
  {
    label: "Address",
    value: "address",
    icon: <MdLocationOn />,
  },
  {
    label: "Website",
    value: "website",
    icon: <FaLink />,
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    value: "github",
    icon: <FaGithub />,
  },
];
