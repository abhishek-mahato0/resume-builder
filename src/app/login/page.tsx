"use client";

import InputPassword from "@/components/atoms/InputPassword";
import { handleCredentialsSignIn } from "@/components/auth/handleAuth";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
};

export default function Page() {
  const [formstate, formAction] = useActionState(
    handleCredentialsSignIn,
    initialState
  );
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: searchParams.get("callbackUrl") || "/dashboard",
    });
  };

  useEffect(() => {
    if (formstate.success) {
      router.push(searchParams.get("callbackUrl") || "/dashboard");
    } else {
      if (!formstate.success) {
        toast.error(formstate.message || "Login failed. Please try again.");
      }
    }
  }, [formstate]);

  return (
    <form
      action={handleSubmit}
      className="layout-content-container flex flex-col lg:w-[512px] w-full py-5 flex-1"
    >
      <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Welcome back
      </h2>
      <div className="flex  flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-white text-base font-medium leading-normal pb-2">
            Email
          </p>
          <input
            placeholder="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3540] focus:border-none h-14 placeholder:text-[#9dacbe] p-4 text-base font-normal leading-normal"
          />
        </label>
      </div>
      <InputPassword name="password" placeholder="Password" required />
      <Link
        href="/login/forget-password"
        className="text-[#9dacbe] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline"
      >
        Forgot password?
      </Link>
      <div className="flex px-4 py-3">
        <Button
          variant="white"
          type="submit"
          disabled={isPending}
          className="w-[98%]"
        >
          Log in
        </Button>
      </div>
      <div className="flex items-center gap-4 text-gray-500 text-sm my-4">
        <hr className="flex-grow border-gray-700" />
        OR
        <hr className="flex-grow border-gray-700" />
      </div>
      <div className="w-full flex items-center flex-col justify-center">
        <button
          disabled={isPending}
          type="button"
          className="w-[90%] cursor-pointer flex items-center justify-center gap-3 bg-white text-black font-medium py-2 rounded-md shadow hover:bg-gray-100 transition"
          onClick={() => handleSignIn()}
        >
          <FaGoogle className="text-xl" />
          Sign in with Google
        </button>
        <Link
          href={`/register?callbackUrl=${searchParams.get("callbackUrl")}`}
          className="text-[#9dacbe] text-sm font-normal leading-normal pb-3 pt-3 px-4 text-center underline cursor-pointer"
        >
          Don&rsquo;t have an account?{" "}
          <span className=" text-white">Sign Up</span>
        </Link>
      </div>
    </form>
  );
}
