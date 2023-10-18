"use client";

import { BoardsProvider } from "@/app/context/boards-provider";
import { redirect } from "next/navigation";
import { useUser } from "@/app/context/user-provider";
import { useEffect } from "react";

const BoardsLayout = ({ children }) => {
  const { Profile } = useUser();

  useEffect(() => {
    if (!Profile) redirect("/");
  }, [Profile]);

  return (
    <BoardsProvider>
      <div className="p-6 h-full flex items-center space-x-8">{children}</div>
    </BoardsProvider>
  );
};

export default BoardsLayout;
