import Link from "next/link";
import React from "react";
import CreateMyResumeButton from "../atoms/CreateMyResumeButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2b3540] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_535)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_535">
                <rect width="48" height="48" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <Link
          href="/"
          className="text-white text-lg font-bold leading-tight tracking-[-0.015em]"
        >
          ResumeCraft
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link
            className="text-white text-sm font-medium leading-normal"
            href="/templates"
          >
            Templates
          </Link>
        </div>
        <div className="flex gap-2">
          <CreateMyResumeButton variant="dark" />
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#2b3540] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div
              className="text-white"
              data-icon="Question"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
