"use client";

import { createContext, useContext, useState } from "react";

const context = createContext();

export const Provider = ({ children }) => {
  const exposed = {};

  return <context.Provider value={exposed}>{children}</context.Provider>;
};

export const useBoard = () => useContext(context);
