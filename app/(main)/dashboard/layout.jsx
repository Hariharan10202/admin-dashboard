"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1 bg-[#ede9e9] text-black dark:bg-[#1e0f24]">
        <Sidebar />
      </div>
      <div className="flex-[4] flex flex-col w-full text-white dark:bg-[#160b1a]">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
