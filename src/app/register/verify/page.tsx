"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyUserEmail } from "@/components/auth/handleAuth";
import Link from "next/link";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token not found.");
        return;
      }

      try {
        const { message, success } = await verifyUserEmail(token);
        if (success) {
          setStatus("success");
          setMessage(message);
        } else {
          setStatus("error");
          setMessage(message || "Invalid or expired token.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Something went wrong.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#14191f] text-white">
      <div className="max-w-md text-center">
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && (
          <div>
            <h1 className="text-2xl font-bold mb-2">Email Verified ✅</h1>
            <p>{message}</p>
            <Link
              href="/login"
              className="text-blue-500 hover:underline mt-4 inline-block"
            >
              Go to Login
            </Link>
          </div>
        )}
        {status === "error" && (
          <div>
            <h1 className="text-2xl font-bold mb-2">Verification Failed ❌</h1>
            <p>{message}</p>
            <Link
              href="/register"
              className="text-blue-500 hover:underline mt-4 inline-block"
            >
              Go back to registration
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
