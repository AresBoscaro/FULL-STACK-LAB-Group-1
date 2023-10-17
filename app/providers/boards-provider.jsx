"use client";

import { createContext, useContext, useState } from "react";

const context = createContext();

export const Provider = ({ children }) => {
  const [tab, setTab] = useState("Dashboard");
  const [items, setItems] = useState([]);

  const exposed = {
    tab,
    setTab,
    items,
    setItems,
  };

  return <context.Provider value={exposed}>{children}</context.Provider>;
};

export const useBoard = () => useContext(context);
