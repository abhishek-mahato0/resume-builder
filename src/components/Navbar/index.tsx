"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="w-full px-6 py-2 border-b border-[#333] flex items-center justify-between bg-black">
      <h1 className="text-xl font-bold text-white">🧑‍💻 Resume Builder</h1>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-300">Hello, {session?.user?.name}</p>
        {/* <Image
            src={user.avatar}
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full border border-gray-500"
          /> */}
      </div>
      <button
        onClick={async () => await signOut()}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
