"use client";
import InputPassword from "@/components/atoms/InputPassword";
import React from "react";

const page = () => {
  return (
    <div className="layout-container flex h-full w-full items-center justify-center flex-col">
      <form className="layout-content-container flex flex-col lg:w-[512px] w-full py-5 flex-1">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Reset Password
        </h2>
        <InputPassword />
        <InputPassword />
      </form>
    </div>
  );
};

export default page;
