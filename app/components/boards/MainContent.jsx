"use client";

import { usePathname } from "next/navigation";
import { useBoard } from "../../context/boards-provider";
import StudentItem from "./StudentItem";
import AdminItem from "./AdminItem";
import Profile from "./Profile";

const MainContent = () => {
  const { tab } = useBoard();

  const pathname = usePathname();

  const test = [1, 2, 3];

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
      {tab == "Profile" && <Profile />}
    </div>
  );
};

export default MainContent;
