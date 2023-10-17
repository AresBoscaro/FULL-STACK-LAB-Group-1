/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { HelpCircle, LayoutGrid, LogOut, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBoard } from "../providers/boards-provider";

const SidebarItems = () => {
  const { tab, setTab } = useBoard();

  const pathname = usePathname();

  const studTabs = [
    {
      label: "Dashboard",
      icon: (
        <LayoutGrid
          className={tab == "Dashboard" ? "text-white" : "text-slate-600"}
          size={18}
        />
      ),
    },
    {
      label: "Profile",
      icon: (
        <User2
          className={tab == "Profile" ? "text-white" : "text-slate-600"}
          size={18}
        />
      ),
    },
    {
      label: "Help",
      icon: (
        <HelpCircle
          className={tab == "Help" ? "text-white" : "text-slate-600"}
          size={18}
        />
      ),
    },
  ];

  const adminTabs = [
    {
      label: "Dashboard",
      icon: (
        <LayoutGrid
          className={tab == "Dashboard" ? "text-white" : "text-slate-600"}
          size={18}
        />
      ),
    },
  ];

  const [tabs, setTabs] = useState(studTabs);

  useEffect(() => {
    if (pathname === "/admin") setTabs(adminTabs);
  }, [pathname]);

  return (
    <div className="mt-10 flex flex-col h-full justify-between">
      <div className="space-y-2">
        {tabs.map((item, id) => (
          <div
            key={id}
            className={`flex items-center space-x-4 cursor-pointer transition-all p-4 hover:translate-x-2 rounded-2xl ${
              tab === item.label && "bg-slate-900"
            }`}
            onClick={() => setTab(item.label)}
          >
            {item.icon}
            <h3
              className={`${
                tab === item.label ? "text-white" : "text-slate-600"
              } text-sm font-light`}
            >
              {item.label}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold text-slate-800">User</h1>
        <div className="hover:bg-slate-200 rounded-2xl p-4 cursor-pointer">
          <LogOut className="text-slate-800" size={20} />
        </div>
      </div>
    </div>
  );
};

export default SidebarItems;
