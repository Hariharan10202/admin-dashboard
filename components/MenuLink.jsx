"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";

const MenuLink = ({ item }) => {
  const path = usePathname();
  const router = useRouter();

  if (item.name === "Logout") {
    return (
      <div
        onClick={() => {
          signOut();
          router.push("/login");
        }}
        key={item.path}
        className={`cursor-pointer flex gap-2 items-center p-3  rounded-xl transition-all hover:bg-gray-400/30 ${
          path === item.path && "bg-gray-400/30"
        }`}
      >
        {item.Icon}
        {item.name}
      </div>
    );
  }

  return (
    <Link
      key={item.path}
      className={`flex gap-2  items-center p-3  rounded-xl transition-all hover:bg-gray-400/30 ${
        path === item.path && "bg-gray-400/30"
      }`}
      href={item.path}
    >
      <span className="text-gray-400 dark:text-white"> {item.Icon}</span>
      <span className="text-black dark:text-white"> {item.name}</span>
    </Link>
  );
};

export default MenuLink;
