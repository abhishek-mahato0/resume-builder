"use client";
import React, { useActionState, useEffect, useTransition } from "react";
import { forgetPassword } from "../auth/handleAuth";
import { toast } from "sonner";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
  success: false,
};

const ForgetPasswordForm = () => {
  const [formstate, formAction] = useActionState(forgetPassword, initialState);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (formstate.success) {
      toast.success(formstate.message, {
        duration: 3000,
      });
    }
    if (!formstate.success && formstate.message) {
      toast.error(formstate.message, {
        duration: 3000,
      });
      router.push("/login");
    }
  }, [formstate]);

  return (
    <form
      action={handleSubmit}
      className="flex flex-col lg:w-[512px] items-center justify-center lg:mt-[10%] w-full py-5"
    >
      <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Forgot Password
      </h2>
      <div className="flex flex-wrap items-end gap-4 px-4 py-3 w-full">
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
      <Button
        type="submit"
        variant="white"
        className="mt-4 w-[90%]"
        disabled={isPending}
      >
        Submit
      </Button>
    </form>
  );
};

export default ForgetPasswordForm;
