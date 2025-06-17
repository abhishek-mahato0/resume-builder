import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <h2
      className="text-xl font-semibold border-b p-2 mb-2"
      style={{ borderColor: "#9CA3AF", color: "#171717" }}
    >
      {title}
    </h2>
  );
};

export default Title;
