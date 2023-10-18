/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { LuLayoutGrid } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { IoHelp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBoard } from "../../context/boards-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/context/user-provider";

const SidebarItems = () => {
  const { tab, setTab } = useBoard();
  const { Profile, setUser, setProfile } = useUser();

  const studTabs = [
    {
      label: "Dashboard",
      icon: <LuLayoutGrid size={18} />,
    },
    {
      label: "Profile",
      icon: <AiOutlineUser size={18} />,
    },
    {
      label: "Help",
      icon: <IoHelp size={18} />,
    },
  ];

  const adminTabs = [
    {
      label: "Dashboard",
      icon: <LuLayoutGrid size={18} />,
    },
  ];

  const [tabs, setTabs] = useState(studTabs);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") setTabs(adminTabs);
  }, [pathname]);

  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      setProfile(null);
    }
  };

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
            <div
              className={tab === item.label ? "text-white" : "text-slate-600"}
            >
              {item.icon}
            </div>
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
        <h1 className="text-sm font-semibold text-slate-800">
          {Profile?.first_name}
        </h1>
        <div
          className="hover:bg-slate-200 rounded-2xl flex items-center justify-center h-12 w-12 cursor-pointer"
          onClick={handleSignOut}
        >
          <LuLogOut className="text-slate-800" size={18} />
        </div>
      </div>
    </div>
  );
};

export default SidebarItems;
