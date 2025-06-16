import { FC } from "react";
import { Education, Experience, Project, ResumeData } from "../../types";

export const Header: FC<{ data: ResumeData }> = ({ data }) => (
  <header className="text-center">
    <h1 className="text-3xl font-bold">{data.name}</h1>
    <p className="text-lg italic">{data.title}</p>
    <div className="text-sm mt-2">
      <p>{data.contact.email} | {data.contact.phone}</p>
      <p>{data.contact.website} | {data.contact.linkedin}</p>
    </div>
  </header>
);

export const Summary: FC<{ summary: string }> = ({ summary }) => (
  <section>
    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Professional Summary</h2>
    <p className="text-justify">{summary}</p>
  </section>
);


export const ExperienceSection: FC<{ experience: Experience[] }> = ({ experience }) => (
  <section>
    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Work Experience</h2>
    {experience.map((exp, idx) => (
      <div key={idx} className="mb-4">
        <div className="flex justify-between text-sm font-medium">
          <span>{exp.role} @ {exp.company}</span>
          <span className="italic">{exp.startDate} – {exp.endDate}</span>
        </div>
        <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
          {exp.description.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </div>
    ))}
  </section>
);

export const EducationSection: FC<{ education: Education[] }> = ({ education }) => (
  <section>
    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Education</h2>
    {education.map((edu, idx) => (
      <div key={idx} className="text-sm mb-2 w-full flex justify-between">
        <span><strong>{edu.degree}</strong> – {edu.school}</span>
        <span className="italic">{edu.startDate} – {edu.endDate}</span>
      </div>
    ))}
  </section>
);


export const Skills: FC<{ skills: string[] }> = ({ skills }) => (
  <section>
    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Skills</h2>
    <p className="text-sm">{skills.join(", ")}</p>
  </section>
);


export const Projects: FC<{ projects?: Project[] }> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section>
      <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Projects</h2>
      {projects.map((proj, i) => (
        <div key={i} className="mb-2">
          <div className="flex justify-between text-sm font-medium">
            <span>{proj.name}</span>
            {proj.live && (
              <a
                href={proj.live}
                className="text-blue-600 underline ml-2"
                target="_blank"
                rel="noopener noreferrer"
              >Live</a>
            )}
          </div>
          <p className="text-sm">{proj.description}</p>
          <p className="text-xs italic text-gray-600">Tech: {proj.tech.join(", ")}</p>
        </div>
      ))}
    </section>
  );
};
