import React from "react";
import { FaEye } from "react-icons/fa";
import { HiEyeOff } from "react-icons/hi";

const InputPassword = ({
  label = "Password",
  placeholder = "Password",
  disabled = false,
  name = "password",
  required = true,
}: {
  label?: string;
  isPending?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="flex flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-white text-base font-medium leading-normal pb-2">
          {label}
        </p>
        <div className="flex w-full relative items-center justify-center">
          <input
            placeholder={placeholder}
            autoComplete="current-password"
            name={name}
            type={showPassword ? "text" : "password"}
            required={required}
            disabled={disabled}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3540] focus:border-none h-14 placeholder:text-[#9dacbe] p-4 text-base font-normal leading-normal"
          />
          <div
            className="absolute right-[20px] text-xl cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <FaEye /> : <HiEyeOff />}
          </div>
        </div>
      </label>
    </div>
  );
};

export default InputPassword;
