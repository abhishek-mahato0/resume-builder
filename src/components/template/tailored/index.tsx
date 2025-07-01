// components/templates/TailoredTemplate.tsx
import { FC } from "react";
import {
  Contact,
  Education,
  Experience,
  Project,
  ResumeData,
  Skills,
} from "../types";
import Title from "@/components/atoms/Title";
import { GoDotFill } from "react-icons/go";
import { contactInfo } from "../utils";
import ProjectsLinks from "../components/ProjectsLinks";

// Tailored Header
export const TailoredHeader: FC<{ data: ResumeData }> = ({ data }) => (
  <header className="text-center flex flex-col gap-2 border-b border-gray-300 pb-4 mb-4">
    <h1 className="text-4xl font-bold text-[#111827]">{data.name}</h1>
    <p className="text-lg italic text-[#4B5563]">{data.title}</p>
    <div className="text-sm text-[#4B5563] flex flex-wrap gap-3 justify-center mt-2">
      {contactInfo.map((info, idx) =>
        data?.contact?.[info.value as keyof Contact] ? (
          <div key={idx} className="flex items-center gap-1">
            {info.icon}
            <span>{data.contact[info.value as keyof Contact]}</span>
          </div>
        ) : null
      )}
    </div>
  </header>
);

// Tailored Summary
export const TailoredSummary: FC<{ summary: string }> = ({ summary }) => (
  <section className="mb-6">
    <Title title="Professional Summary" />
    <p className="text-sm text-[#374151] text-justify leading-relaxed">
      {summary}
    </p>
  </section>
);

// Tailored Experience
export const TailoredExperience: FC<{ experience: Experience[] }> = ({
  experience,
}) => (
  <section className="mb-6">
    <Title title="Work Experience" />
    <div className="space-y-4">
      {experience.map((exp, idx) => (
        <div key={idx}>
          <div className="flex justify-between text-sm font-semibold text-[#111827]">
            <span>
              {exp.role} @ {exp.company}
            </span>
            <span className="italic text-[#6B7280]">
              {exp.startDate} – {exp.endDate}
            </span>
          </div>
          <ul className="list-disc ml-6 mt-1 text-sm text-[#374151]">
            {exp.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

// Tailored Education
export const TailoredEducation: FC<{ education: Education[] }> = ({
  education,
}) => (
  <section className="mb-6">
    <Title title="Education" />
    <div className="space-y-2">
      {education.map((edu, idx) => (
        <div key={idx} className="text-sm flex justify-between text-[#374151]">
          <span>
            <strong>{edu.degree}</strong> – {edu.school}
          </span>
          <span className="italic">
            {edu.startDate} – {edu.endDate}
          </span>
        </div>
      ))}
    </div>
  </section>
);

// Tailored Skills
export const TailoredSkills: FC<{
  skills: string[] | Skills[];
  title?: string;
}> = ({ skills, title = "Skills" }) => (
  <section className="mb-6">
    <Title title={title} />
    <div className="flex flex-wrap gap-3 text-sm text-[#374151] mt-2">
      {skills.map((skill) => (
        <div
          key={typeof skill === "string" ? skill : skill.name}
          className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
        >
          <GoDotFill className="text-blue-500" />
          {typeof skill === "string" ? skill : skill.name}
        </div>
      ))}
    </div>
  </section>
);

// Tailored Languages (using same Skills type)
export const TailoredLanguages: FC<{ languages: Skills[] }> = ({
  languages,
}) => (
  <section className="mb-6">
    <Title title="Languages" />
    <div className="flex flex-wrap gap-3 text-sm text-[#374151] mt-2">
      {languages.map((lang) => (
        <div
          key={lang.name}
          className="flex flex-col items-start bg-gray-100 px-3 py-2 rounded w-fit"
        >
          <span className="font-semibold">{lang.name}</span>
          {lang.subtitle ? (
            <span className="text-xs italic text-gray-500">
              {lang.subtitle}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  </section>
);

// Tailored Projects
export const TailoredProjects: FC<{ projects?: Project[] }> = ({
  projects,
}) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section className="mb-6">
      <Title title="Projects" />
      <div className="space-y-3">
        {projects.map((proj, i) => (
          <div key={i} className="text-sm text-[#374151]">
            <div className="flex justify-between font-medium">
              <span>{proj.name}</span>
            </div>
            <p className="text-sm">{proj.description}</p>
            {proj.tech ? (
              <p className="text-xs italic text-[#6B7280]">
                Tech: {proj.tech.join(", ")}
              </p>
            ) : null}
            <ProjectsLinks live={proj.live} code={proj.code} />
          </div>
        ))}
      </div>
    </section>
  );
};
