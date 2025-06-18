import React from "react";

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
  variant?: "default" | "destructive" | "outline";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  asChild?: boolean;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        variant === "destructive"
          ? "bg-red-600 hover:bg-red-700 text-white"
          : variant === "outline"
          ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } ${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : ""} ${
        className || ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
