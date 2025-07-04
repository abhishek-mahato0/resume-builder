"use client";

import { signIn } from "@/auth";
import { handleRegister } from "@/components/auth/handleAuth";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useTransition } from "react";
import { FaGoogle } from "react-icons/fa";

const initialState = {
  message: "",
  success: false,
};

export default function Page() {
  const searchParams = useSearchParams();
  const [formstate, formAction] = useActionState(handleRegister, initialState);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#14191f] dark group/design-root overflow-x-hidden">
      <Navbar />
      <div className="layout-container flex h-full w-full items-center justify-center flex-col">
        <form
          action={handleSubmit}
          className="layout-content-container flex flex-col lg:w-[512px] w-full py-5 flex-1"
        >
          <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
            Welcome To ResumeCraft
          </h2>
          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                FullName
              </p>
              <input
                placeholder="name"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3540] focus:border-none h-14 placeholder:text-[#9dacbe] p-4 text-base font-normal leading-normal"
                disabled={isPending}
                name="name"
                required
                autoComplete="name"
                autoFocus
                type="text"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Email
              </p>
              <input
                placeholder="Email"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3540] focus:border-none h-14 placeholder:text-[#9dacbe] p-4 text-base font-normal leading-normal"
                name="email"
                type="email"
                required
                disabled={isPending}
              />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Password
              </p>
              <input
                placeholder="Password"
                name="password"
                type="text"
                required
                disabled={isPending}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3540] focus:border-none h-14 placeholder:text-[#9dacbe] p-4 text-base font-normal leading-normal"
              />
            </label>
          </div>
          <div className="flex px-4 py-3">
            <button
              type="submit"
              className="flex min-w-[84px]  cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-white text-[#14191f] text-base font-bold leading-normal tracking-[0.015em]"
              disabled={isPending}
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          {formstate?.message && (
            <div className="flex items-center justify-between px-4 py-3 text-xs text-red-600">
              {formstate.message}
            </div>
          )}
          <div className="flex items-center gap-4 text-gray-500 text-sm my-4">
            <hr className="flex-grow border-gray-700" />
            OR
            <hr className="flex-grow border-gray-700" />
          </div>
          <div className="w-full flex items-center flex-col justify-center">
            <button
              type="button"
              className="w-[90%] flex items-center justify-center gap-3 bg-white text-black font-medium py-2 rounded-md shadow hover:bg-gray-100 transition"
              onClick={async () =>
                await signIn("google", {
                  callbackUrl: `${searchParams.get("callbackUrl")}`,
                })
              }
            >
              <FaGoogle className="text-xl" />
              Sign up with Google
            </button>
            <Link
              href="/login"
              className="text-[#9dacbe] text-sm font-normal leading-normal pb-3 pt-3 px-4 text-center underline"
            >
              Already have an account?{" "}
              <span className=" text-white">Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
