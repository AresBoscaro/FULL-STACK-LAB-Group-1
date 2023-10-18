"use client";

import { usePathname } from "next/navigation";
import { useBoard } from "../../context/boards-provider";
import StudentItem from "./StudentItem";
import AdminItem from "./AdminItem";
import ProfileManager from "./ProfileManager";
import { useUser } from "@/app/context/user-provider";
import { supabaseClient } from "@/app/lib/supabase";
import { useEffect } from "react";

const MainContent = () => {
  const { tab } = useBoard();
  const { Profile } = useUser();

  const pathname = usePathname();

  const test = [1, 2, 3];

  const getCourses = async () => {
    const { data, error } = supabaseClient.from("classes").select("id", "name");

    if (!error) console.log("courses", data);
  };

  useEffect(() => {
    if (Profile) getCourses();
  }, [Profile]);

  return (
    <div className="h-full w-full bg-white shadow-sm flex flex-col rounded-2xl p-6 space-y-10 overflow-y-auto">
      <h1 className="text-slate-800 font-semibold text-lg">{tab}</h1>
      {tab === "Dashboard" && (
        <div className="space-y-4 ">
          {test.map((item, id) =>
            pathname === "/dashboard" ? (
              <StudentItem key={id} />
            ) : (
              <AdminItem key={id} />
            )
          )}
        </div>
      )}
      {tab == "Profile" && <ProfileManager />}
    </div>
  );
};

export default MainContent;
