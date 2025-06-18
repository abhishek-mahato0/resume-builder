import React from "react";

const Navbar = ({
  user,
}: {
  user: {
    name: string;
    avatar: string;
  };
}) => {
  return (
    <nav className="w-full px-6 py-4 border-b border-[#333] flex items-center justify-between bg-[#2a2b2d]">
      <h1 className="text-xl font-bold text-white">🧑‍💻 Resume Builder</h1>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-300">Hello, {user.name}</p>
        {/* <Image
          src={user.avatar}
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full border border-gray-500"
        /> */}
      </div>
    </nav>
  );
};

export default Navbar;
