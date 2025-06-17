import { FC } from "react";
import {
  Contact,
  Education,
  Experience,
  Project,
  ResumeData,
} from "../../types";
import Title from "@/components/atoms/Title";
import { IoMdMail } from "react-icons/io";
import { FaGithub, FaLink, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const contactInfo = [
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

export const Header: FC<{ data: ResumeData }> = ({ data }) => (
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

export const Summary: FC<{ summary: string }> = ({ summary }) => (
  <section>
    <Title title="Professional Summary" />
    <p className="text-justify text-[#374151]">{summary}</p>
  </section>
);

export const ExperienceSection: FC<{ experience: Experience[] }> = ({
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

export const EducationSection: FC<{ education: Education[] }> = ({
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

export const Skills: FC<{ skills: string[] }> = ({ skills }) => (
  <section>
    <Title title="Skills" />
    <p className="text-sm text-[#374151]">{skills.join(", ")}</p>
  </section>
);

export const Projects: FC<{ projects?: Project[] }> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section>
      <Title title="Projects" />
      {projects.map((proj, i) => (
        <div key={i} className="mb-2 text-[#374151]">
          <div className="flex justify-between text-sm font-medium">
            <span>{proj.name}</span>
            {proj.live && (
              <a
                href={proj.live}
                className="underline ml-2"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2563EB" }}
              >
                Live
              </a>
            )}
          </div>
          <p className="text-sm">{proj.description}</p>
          <p className="text-xs italic text-[#4B5563]">
            Tech: {proj.tech.join(", ")}
          </p>
        </div>
      ))}
    </section>
  );
};
