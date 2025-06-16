import React from "react";
import { ResumeData } from "../types";

// resumeData.ts

const Classic = ({ data }: { data: ResumeData }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white text-black font-serif p-8 shadow-lg border border-gray-300 space-y-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-lg italic">{data.title}</p>
        <div className="text-sm mt-2">
          <p>
            {data.contact.email} | {data.contact.phone}
          </p>
          <p>
            {data.contact.website} | {data.contact.linkedin}
          </p>
        </div>
      </header>

      {/* Summary */}
      <section>
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Professional Summary
        </h2>
        <p className="text-justify">{data.summary}</p>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Work Experience
        </h2>
        {data.experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between text-sm font-medium">
              <span>
                {exp.role} @ {exp.company}
              </span>
              <span className="italic">
                {exp.startDate} – {exp.endDate}
              </span>
            </div>
            <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
              {exp.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Education
        </h2>
        {data.education.map((edu, idx) => (
          <div
            key={idx}
            className="text-sm mb-2 w-full flex align-items-center justify-between"
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

      {/* Skills */}
      <section>
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Skills
        </h2>
        <p className="text-sm">{data.skills.join(", ")}</p>
      </section>

      {/* Projects */}
      {data && data?.projects && data?.projects?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
            Projects
          </h2>
          {data?.projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{proj.name}</span>
                {proj.live && (
                  <a
                    href={proj.live}
                    className="text-blue-600 underline ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </a>
                )}
              </div>
              <p className="text-sm">{proj.description}</p>
              <p className="text-xs italic text-gray-600">
                Tech: {proj.tech.join(", ")}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Classic;
