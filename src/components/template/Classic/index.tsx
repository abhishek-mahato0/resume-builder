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

export const ClassicHeader: FC<{ data: ResumeData }> = ({ data }) => (
  <header className="text-center flex flex-col gap-2">
    <h1 className="text-3xl font-bold text-[#171717]">{data.name}</h1>
    <p className="text-lg italic text-[#374151]">{data.title}</p>
    <div className="text-sm text-[#374151] flex flex-wrap gap-4 align-items-center justify-center">
      {contactInfo.map((info, idx) =>
        data?.contact?.[info.value as keyof Contact] ? (
          <div key={idx} className="flex items-center gap-1">
            {info.icon}
            <span>
              {data.contact?.[info.value as keyof Contact] || info.label}
            </span>
          </div>
        ) : null
      )}
    </div>
  </header>
);

export const ClassicSummary: FC<{ summary: string }> = ({ summary }) => (
  <section>
    <Title title="Professional Summary" />
    <p className="text-justify text-[#374151]">{summary}</p>
  </section>
);

export const ClassicExperienceSection: FC<{ experience: Experience[] }> = ({
  experience,
}) => (
  <section>
    <Title title="Work Experience" />
    {experience.map((exp, idx) => (
      <div key={idx} className="mb-4">
        <div className="flex justify-between text-sm font-medium text-[#171717]">
          <span>
            {exp.role} @ {exp.company}
          </span>
          <span className="italic">
            {exp.startDate} – {exp.endDate}
          </span>
        </div>
        <ul className="list-disc ml-5 mt-1 text-sm text-[#374151]">
          {exp.description.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);

export const ClassicEducationSection: FC<{ education: Education[] }> = ({
  education,
}) => (
  <section>
    <Title title="Education" />
    {education.map((edu, idx) => (
      <div
        key={idx}
        className="text-sm mb-2 w-full flex justify-between text-[#374151]"
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

export const ClassicSkills: FC<{
  skills: string[] | Skills[];
  title: string;
}> = ({ skills, title = "Skills" }) => (
  <section>
    <Title title={title} />
    <div className=" flex flex-wrap gap-3 list-disc list-inside py-3 px-4 text-sm text-[#374151]">
      {skills.map((skill) => (
        <div
          key={skill.toString()}
          className="flex gap-1"
          style={{ alignItems: "center" }}
        >
          <GoDotFill />
          {typeof skill === "string" ? skill : skill.name}
        </div>
      ))}
    </div>
  </section>
);

export const ClassicProjects: FC<{ projects?: Project[] }> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section>
      <Title title="Projects" />
      {projects.map((proj, i) => (
        <div key={i} className="mb-3 text-[#374151]">
          <div className="flex justify-between flex-col gap-[0.5px] text-sm font-medium">
            <span className="font-[550]">{proj.name}</span>
            <p className="text-sm">{proj.description}</p>
            <p className="text-xs italic text-[#4B5563]">
              Tech: {proj.tech.join(", ")}
            </p>
            {proj.live && <p className="text-sm">Live: {proj.live}</p>}
            {proj.code && <p className="text-sm">Code: {proj.code}</p>}
          </div>
        </div>
      ))}
    </section>
  );
};
