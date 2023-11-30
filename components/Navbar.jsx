"use client";

import { Bell, Globe, MessagesSquareIcon, Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const path = usePathname();

  return (
    <div className="text-black bg-white dark:text-white dark:bg-[#160b1a] w-full p-5">
      <div className="flex bg-gray-700/10 backdrop:blur-[10px] dark:bg-white/10 dark:backdrop:blur-[10px] p-5 rounded-xl">
        <div className="flex justify-between items-center w-full">
          <h1 className="capitalize font-bold text-[20px]">
            {path.split("/").pop()}
          </h1>
          <div className="flex gap-5 items-center">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText placeholder="Search" />
            </span>
            <Switch
              checked={theme === "dark" ? true : false}
              onCheckedChange={(e) => {
                setTheme(e ? "dark" : "light");
              }}
            />
            <MessagesSquareIcon />
            <Bell />
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
