"use client";
import InputPassword from "@/components/atoms/InputPassword";
import React from "react";

const page = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form className="flex flex-col lg:w-[512px] w-full py-5">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Reset Password
        </h2>
        <InputPassword
          name="newPassowrd"
          label="New Password"
          placeholder="Enter New Password"
        />
        <InputPassword
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm New Password"
        />
        <button
          type="submit"
          className="flex min-w-[84px] mt-4 cursor-pointer items-center justify-center overflow-hidden rounded-full py-3 px-5 flex-1 bg-white text-[#14191f] text-base font-bold leading-normal tracking-[0.015em]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
