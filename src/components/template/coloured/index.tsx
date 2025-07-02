import { FC } from "react";
import {
  ResumeData,
  Skills,
  Experience,
  Education,
  Project,
  Contact,
} from "../types";
import { contactInfo } from "../utils";
import ProjectsLinks from "../components/ProjectsLinks";
import CustomCircularProgress from "../components/CircularProgresBar";

const Layout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex w-full mb-10">
    <div className="w-[25%]">
      <span className="text-[#6b7280]">{title}</span>
    </div>
    <div className="flex flex-col gap-6 w-[75%]">{children}</div>
  </div>
);

const getColor = (level: number) => {
  switch (level) {
    case 5:
      return "#045407"; // Green
    case 4:
      return "#4caf50"; // Green
    case 3:
      return "#ffeb3b"; // Yellow
    case 2:
    case 1:
      return "#f44336"; // Red
    default:
      return "#9ca3af"; // Gray
  }
};

export const ColoredSkills: FC<{
  skills: Skills[] | string[];
  title: string;
}> = ({ skills, title }) => (
  <Layout title={title}>
    <div className="flex gap-6 flex-wrap">
      {skills.map((skill) => {
        const skillName = typeof skill === "string" ? skill : skill.name;
        const level = typeof skill === "string" ? 5 : (+skill.level * 100) / 5;

        return (
          <div
            key={skillName + level}
            className="flex items-center justify-center gap-2"
          >
            {typeof skill !== "string" && level && (
              <CustomCircularProgress
                value={skill.level * 20}
                text={`${skill.level}`}
                color={getColor(skill.level)}
                trailColor="#e5e7eb"
                strokeWidth={6}
                size={34}
                textSize="12px"
              />
            )}
            <p className=" text-[#374151] font-semibold">
              {skillName || "Your summary here."}
            </p>
          </div>
        );
      })}
    </div>
  </Layout>
);

export const ColoredExperience: FC<{ experience: Experience[] }> = ({
  experience,
}) => (
  <Layout title="Experience">
    <div className="space-y-4">
      {experience.map((exp) => (
        <div key={exp.startDate.toString()}>
          <div className="flex flex-col text-normal font-semibold text-[#111827]">
            <span>{exp.company}</span>
            <span className="text-xs text-[#96999d]">
              {exp.startDate} – {exp.endDate}
            </span>
          </div>
          <ul className="list-disc ml-5 pl-2 mt-2 text-normal">
            {exp.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Layout>
);

export const ColoredEducation: FC<{ education: Education[] }> = ({
  education,
}) => (
  <Layout title="Education">
    <div className="space-y-4">
      {education.map((exp, idx) => (
        <div key={exp.startDate.toString() + idx}>
          <div className="flex flex-col text-normal font-semibold text-[#111827]">
            <span>
              {exp.degree} - {exp.school}
            </span>
            <span className="text-xs text-[#96999d]">
              {exp.startDate} – {exp.endDate}
            </span>
          </div>
        </div>
      ))}
    </div>
  </Layout>
);

export const ColoredProjects: FC<{ projects?: Project[] }> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <Layout title="Projects">
      {projects.map((proj, i) => (
        <div key={proj.name + i}>
          <div className="flex justify-between text-sm font-medium text-[#1f2937]">
            <span className="text-normal font-bold">{proj.name}</span>
          </div>
          <div className="text-normal mt-1">
            {typeof proj.description === "string" ? (
              proj.description
            ) : (
              <ul className="list-disc ml-5 pl-2 mt-2 text-normal">
                {proj.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-xs text-[#96999d] mt-1">
            Tech: {proj.tech.join(", ")}
          </p>
          <ProjectsLinks live={proj?.live} code={proj?.code} />
        </div>
      ))}
    </Layout>
  );
};

export const ColoredHeader: FC<{ data: ResumeData }> = ({ data }) => (
  <div className="flex w-full">
    <div className="w-[25%]">
      <span className="text-[#6b7280]">About Me</span>
    </div>
    <div className="flex flex-col gap-6 w-[75%]">
      <div className="text-normal text-[#6b7280] flex flex-wrap gap-4">
        {contactInfo.map((info, idx) =>
          data?.contact?.[info.value as keyof Contact] ? (
            <div key={idx} className="flex items-center gap-1">
              {info.icon}
              <span>{data.contact[info.value as keyof Contact]}</span>
            </div>
          ) : null
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#111827]">
          {data.name || "Your Name"}
        </h1>
        <p className=" text-[#374151] font-semibold">
          {data.summary || "Your summary here."}
        </p>
      </div>
    </div>
  </div>
);
