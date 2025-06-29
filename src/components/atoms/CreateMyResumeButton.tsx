"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

type ResumeButtonProps = {
  text?: string;
  href?: string;
  variant?: "light" | "dark";
  size?: "sm" | "lg";
};

export default function CreateMyResumeButton({
  text = "Create My Resume",
  variant = "light",
  size = "sm",
}: ResumeButtonProps) {
  const { data: session } = useSession();
  const className = `
    flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full
    ${size === "lg" ? "h-12 px-5 text-base" : "h-10 px-4 text-sm"}
    ${
      variant === "dark"
        ? "bg-[#2b3540] text-white"
        : "bg-[#b2cae5] text-[#14191f]"
    }
    font-bold leading-normal tracking-[0.015em]
  `;

  return (
    <Link
      href={`${session?.user?.email ? "/dashboard" : "/login"}`}
      className={className}
    >
      <span className="truncate">{text}</span>
    </Link>
  );
}
