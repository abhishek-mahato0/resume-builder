"use client";
import { createUser } from "@/components/auth/utils";
import React from "react";

const index = () => {
  return (
    <button
      onClick={async () => await createUser()}
      className="px-3 py-3 bg-amber-600"
    >
      index
    </button>
  );
};

export default index;
