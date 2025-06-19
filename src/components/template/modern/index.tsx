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

export const ModernHeader: FC<{ data: ResumeData }> = ({ data }) => (
  <header className="text-left flex flex-col gap-1 bg-[#f3f4f6] p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
    <h1 className="text-4xl font-extrabold text-[#111827]">{data.name}</h1>
    <p className="text-lg font-medium text-[#1f2937]">{data.title}</p>
    <div className="text-sm text-[#4b5563] flex flex-wrap gap-4 mt-2">
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

export const ModernSummary: FC<{ summary: string }> = ({ summary }) => (
  <section className="mt-6">
    <Title title="Summary" />
    <p className="text-[#374151] leading-relaxed text-justify bg-[#ffffff] p-4 rounded-md border border-[#e5e7eb]">
      {summary}
    </p>
  </section>
);

export const ModernExperience: FC<{ experience: Experience[] }> = ({
  experience,
}) => (
  <section className="mt-6">
    <Title title="Experience" />
    {experience.map((exp, idx) => (
      <div
        key={idx}
        className="p-4 mb-4 bg-[#f9fafb] border border-[#d1d5db] rounded-md shadow-sm"
      >
        <div className="flex justify-between text-sm font-semibold text-[#111827]">
          <span>
            {exp.role} @ {exp.company}
          </span>
          <span className="italic">
            {exp.startDate} – {exp.endDate}
          </span>
        </div>
        <ul className="list-disc ml-5 mt-2 text-sm text-[#374151]">
          {exp.description.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);

export const ModernEducation: FC<{ education: Education[] }> = ({
  education,
}) => (
  <section className="mt-6">
    <Title title="Education" />
    {education.map((edu, idx) => (
      <div
        key={idx}
        className="text-sm flex justify-between items-center p-3 border border-[#d1d5db] rounded-md bg-[#ffffff] mb-2 text-[#1f2937]"
      >
        <span>
          <strong>{edu.degree}</strong> – {edu.school}
        </span>
        <span className="italic">
          {edu.startDate} – {edu.endDate}
        </span>
      </div>
    ))}
  </section>
);

export const ModernSkills: FC<{
  skills: string[] | Skills[];
  title?: string;
}> = ({ skills, title = "Skills" }) => (
  <section className="mt-6">
    <Title title={title} />
    <div className="flex flex-wrap gap-5 list-disc list-inside bg-[#f9fafb] border border-[#d1d5db] rounded-md p-3 text-sm text-[#374151]">
      {skills.map((skill) => (
        <div
          key={skill.toString()}
          className="flex"
          style={{ alignItems: "center" }}
        >
          <span>
            <GoDotFill />
          </span>
          <span>{typeof skill === "string" ? skill : skill.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export const ModernProjects: FC<{ projects?: Project[] }> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section className="mt-6">
      <Title title="Projects" />
      {projects.map((proj, i) => (
        <div
          key={i}
          className="mb-3 p-4 border border-[#d1d5db] rounded-md bg-[#ffffff] shadow-sm"
        >
          <div className="flex justify-between text-sm font-medium text-[#1f2937]">
            <span>{proj.name}</span>
            {proj.live && (
              <a
                href={proj.live}
                className="text-[#2563eb] underline ml-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
              </a>
            )}
          </div>
          <p className="text-sm text-[#374151] mt-1">{proj.description}</p>
          <p className="text-xs italic text-[#6b7280] mt-1">
            Tech: {proj.tech.join(", ")}
          </p>
        </div>
      ))}
    </section>
  );
};
