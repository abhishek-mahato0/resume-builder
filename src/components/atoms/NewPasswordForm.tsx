"use client";
import React, { useActionState, useEffect, useTransition } from "react";
import InputPassword from "./InputPassword";
import { resetPassword } from "../auth/handleAuth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { toast } from "sonner";
import { z } from "zod";

const initialState = {
  message: "",
  success: false,
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^()[\]{}])[A-Za-z\d@$!%*?#&^()[\]{}]{8,}$/;

export const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // show error under confirmPassword
  });

const NewPasswordForm = () => {
  const [formstate, formAction] = useActionState(resetPassword, initialState);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const token = searchParams.get("token") as string;
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const password = formData.get("newPassword") as string;
    const currPassword = formData.get("confirmPassword") as string;
    const verify = passwordSchema.safeParse({
      newPassword: password,
      confirmPassword: currPassword,
    });

    if (verify.error) {
      toast.error(verify.error.issues[0].message, {
        duration: 3000,
      });
      return;
    }
    const updatedFormdata = new FormData();
    updatedFormdata.append("newPassword", password);
    updatedFormdata.append("confirmPassword", currPassword);
    updatedFormdata.append("email", email);
    updatedFormdata.append("token", token);
    startTransition(() => {
      formAction(updatedFormdata);
    });
  };

  useEffect(() => {
    if (!email || !token) {
      toast.error("Invalid or expired link.", {
        duration: 3000,
      });
      router.push("/login");
    }
  }, [searchParams]);

  useEffect(() => {
    if (formstate.success) {
      toast.success(formstate.message, {
        duration: 3000,
      });
      router.push("/login");
    }
    if (!formstate.success && formstate.message) {
      toast.error(formstate.message, {
        duration: 3000,
      });
    }
  }, [formstate]);

  return (
    <form
      action={handleSubmit}
      className="flex flex-col lg:w-[512px] lg:mt-[5%] w-full py-5"
    >
      <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Reset Password
      </h2>
      <InputPassword
        name="newPassword"
        label="New Password"
        placeholder="Enter New Password"
      />
      <InputPassword
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm New Password"
      />
      <div className="flex flex-col items-center justify-center">
        <Button
          disabled={isPending}
          className="mt-4 w-[90%]"
          variant="white"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default NewPasswordForm;
