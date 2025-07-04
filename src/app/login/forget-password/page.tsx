import React from "react";

const page = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <form className="flex flex-col lg:w-[512px] w-full py-5">
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
