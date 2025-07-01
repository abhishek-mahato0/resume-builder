import React from "react";

const ProjectsLinks = ({
  live = "",
  code = "",
}: {
  live?: string;
  code?: string;
}) => {
  return (
    <div className="flex flex-col">
      {live ? (
        <p className="text-normal mt-1">
          Live:
          <a
            href={live}
            className="text-[#2563eb] underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {live}
          </a>
        </p>
      ) : null}
      {code ? (
        <p className="text-normal">
          Code:
          <a
            href={code}
            className="text-[#2563eb] underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {code}
          </a>
        </p>
      ) : null}
    </div>
  );
};

export default ProjectsLinks;
