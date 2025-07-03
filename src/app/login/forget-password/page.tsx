import React from "react";

const page = () => {
  return (
    <div className=" w-full h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Forgot Password
        </h2>
        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Email
            </p>
            <input
              placeholder="Enter your email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3540] focus:border-none h-14 placeholder:text-[#9dacbe] p-4 text-base font-normal leading-normal"
              name="email"
              required
              autoFocus
              type="email"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default page;
