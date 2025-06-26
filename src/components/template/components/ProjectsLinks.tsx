import React from "react";

const ProjectsLinks = ({ live, code }: { live?: string; code?: string }) => {
  return (
    <div className="flex flex-col gap-1">
      {live && (
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
      )}
      {code && (
        <p className="text-normal mt-1">
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
      )}
    </div>
  );
};

export default ProjectsLinks;
