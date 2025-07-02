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
    <p className="text-justify text-[#374151] text-sm">{summary}</p>
  </section>
);

export const ClassicExperienceSection: FC<{ experience: Experience[] }> = ({
  experience,
}) => (
  <section>
    <Title title="Work Experience" />
    {experience?.map((exp) => (
      <div
        key={`${exp.startDate.toString()}${exp.endDate.toString()}`}
        className="mb-4"
      >
        <div className="flex justify-between text-sm font-semibold text-[#171717]">
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
    {education?.map((edu, idx) => (
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
    <div className=" flex flex-col gap-3 list-disc list-inside py-3 text-sm text-[#374151]">
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

export const ClassicProjects: FC<{ projects?: Project[] }> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section>
      <Title title="Projects" />
      {projects.map((proj, i) => (
        <div key={i} className="mb-3 text-[#374151]">
          <div className="flex justify-between flex-col gap-[0.5px] text-sm font-medium">
            <span className="font-[550]">{proj.name}</span>
            <div className="text-sm">
              {typeof proj?.description === "string" ? (
                proj.description
              ) : (
                <ul className="list-disc ml-5">
                  {proj.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
            {proj?.tech?.length > 0 ? (
              <p className="text-sm text-[#4B5563]">
                Tech: {proj.tech.join(", ")}
              </p>
            ) : null}
            <ProjectsLinks live={proj.live} code={proj.code} />
          </div>
        </div>
      ))}
    </section>
  );
};
