import Classic from "@/components/template/Classic/page";
import { sampleData } from "@/components/template/data";
import React from "react";

const page = () => {
  return (
    <div>
      <Classic data={sampleData} />
    </div>
  );
};

export default page;
