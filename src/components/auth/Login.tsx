"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleLogin } from "./utils";
import { FaGoogle } from "react-icons/fa";
import Button from "../ui/Button";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentForm = searchParams.get("form") || "login";

  const toggleForm = () => {
    const params = new URLSearchParams(searchParams);
    const newForm = currentForm === "login" ? "signup" : "login";
    params.set("form", newForm);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && router.push("/")}>
      <DialogContent
        showCloseButton
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {currentForm === "login" ? "Welcome Back" : "Welcome"}
          </DialogTitle>
          <DialogDescription>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(e);
              }}
              autoComplete="off"
              className="space-y-6 w-full max-w-md mx-auto rounded-xl shadow-lg"
            >
              <div className="text-sm text-gray-400">
                {currentForm === "login"
                  ? "Please sign in to continue"
                  : "Please sign up to create an account"}
              </div>
              {currentForm === "login" ? null : (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                {searchParams.get("form") === "login" ? "Sign In" : "Sign Up"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 text-gray-500 text-sm my-4">
                <hr className="flex-grow border-gray-700" />
                OR
                <hr className="flex-grow border-gray-700" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white text-black font-medium py-2 rounded-md shadow hover:bg-gray-100 transition"
                onClick={async () =>
                  await signIn("google", {
                    callbackUrl: `${searchParams.get("callbackUrl")}`,
                  })
                }
              >
                <FaGoogle className="text-xl" />
                Sign in with Google
              </button>
              <div className="text-sm text-gray-400 text-center">
                {currentForm === "login"
                  ? "Not signed in yet?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-blue-400 hover:underline ml-1"
                >
                  {currentForm === "login" ? "Create an account" : "Sign in"}
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
