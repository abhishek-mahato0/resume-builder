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
import { contactInfo, isArrayString } from "../utils";
import ProjectsLinks from "../components/ProjectsLinks";

export const ModernHeader: FC<{ data: ResumeData }> = ({ data }) => (
  <header className="text-left flex flex-col gap-1 bg-[#f3f4f6] p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
    <h1 className="text-4xl font-extrabold text-[#111827]">{data.name}</h1>
    <p className="text-lg font-medium text-[#1f2937]">{data.title}</p>
    <div className="text-sm text-[#4b5563] flex flex-wrap gap-4 mt-2">
      {contactInfo.map((info, idx) =>
        data?.contact?.[info.value as keyof Contact] ? (
          <div key={info.value + idx} className="flex items-center gap-1">
            {info.icon}
            <a href={data.contact[info.value as keyof Contact]} target="_blank">
              {data.contact[info.value as keyof Contact]}
            </a>
          </div>
        ) : null
      )}
    </div>
  </header>
);

export const ModernSummary: FC<{ summary: string }> = ({ summary }) => (
  <section className="mt-6">
    <Title title="Summary" />
    <p className="text-[#374151] leading-relaxed text-justify  p-4 rounded-md border border-[#e5e7eb]">
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
        key={exp.company + exp.startDate + exp.endDate + idx}
        className="p-4 mb-4  border border-[#d1d5db] rounded-md shadow-sm"
      >
        <div className="flex justify-between text-sm font-semibold text-[#111827]">
          <span className="flex flex-col">
            {exp.role} @ {exp.company}
            <span className="text-sm font-normal text-[#374151]">
              {exp.location}
            </span>
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
        key={edu.startDate + idx}
        className="text-sm flex justify-between items-center p-3 border border-[#d1d5db] rounded-md mb-2 text-[#1f2937]"
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
    <div
      className={`flex ${
        isArrayString(skills) ? "flex-wrap" : "flex-col"
      } gap-5 list-disc list-inside border border-[#d1d5db] rounded-md p-3 text-sm text-[#374151]`}
    >
      {skills?.map((skill, ind) => (
        <div
          key={`${
            typeof skill === "string" ? skill.toString() : skill.name
          }-${ind}`}
          className="flex gap-1 flex-col"
        >
          {typeof skill !== "string" ? (
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{skill.name}</p>
              <ul className="flex items-center gap-3 list-disc">
                {skill.subtitle?.split(",")?.map((ele) => (
                  <li className="flex items-center pl-1" key={ele}>
                    {ele}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <GoDotFill />
              {skill}
            </div>
          )}
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
          key={proj.name + i}
          className="mb-3 p-4 border border-[#d1d5db] rounded-md shadow-sm"
        >
          <div className="flex justify-between text-sm font-medium text-[#1f2937]">
            <span>{proj.name}</span>
          </div>
          <div className="text-sm text-[#374151] mt-1">
            {typeof proj.description === "string" ? (
              proj.description
            ) : (
              <ul className="list-disc ml-5 mt-2 text-sm text-[#374151]">
                {proj.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
          </div>
          {proj.tech?.length > 0 && (
            <p className="text-xs italic text-[#6b7280] mt-1">
              Tech: {proj.tech.join(", ")}
            </p>
          )}
          <ProjectsLinks live={proj?.live} code={proj?.code} />
        </div>
      ))}
    </section>
  );
};
