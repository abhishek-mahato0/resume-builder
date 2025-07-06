import React from "react";
import { Loader } from "../atoms/Loader";

const Button = ({
  onClick,
  children,
  className,
  variant,
  disabled,
  size,
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "white";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-3 rounded-full transition-colors cursor-pointer hover:scale-[1.02] flex items-center justify-center ${
        variant === "destructive"
          ? "bg-red-600 hover:bg-red-700 text-white"
          : variant === "outline"
          ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
          : variant === "white"
          ? "bg-white text-[#14191f] text-base font-bold leading-normal tracking-[0.015em]"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } ${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : ""} ${
        className || ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {disabled && <Loader className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
