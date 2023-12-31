/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./user-provider";
import { redirect } from "next/navigation";

const context = createContext();

export const BoardsProvider = ({ children }) => {
  const [tab, setTab] = useState("Dashboard");
  const [items, setItems] = useState([]);

  const { Profile } = useUser();

  useEffect(() => {
    if (!Profile) redirect("/");
  }, [Profile]);

  const exposed = {
    tab,
    setTab,
    items,
    setItems,
  };

  return <context.Provider value={exposed}>{children}</context.Provider>;
};

export const useBoard = () => useContext(context);
