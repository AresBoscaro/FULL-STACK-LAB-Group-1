/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const supabase = createClientComponentClient();

  const handleUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) setUser(user);
  };

  const getUserRole = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("isAdmin")
      .eq("id", User.id);

    if (!error) setIsAdmin(data[0].isAdmin);
  };

  useEffect(() => {
    handleUser();
  }, []);

  useEffect(() => {
    console.log("user", User);
    if (User) getUserRole();
  }, [User]);

  const exposed = {
    User,
    setUser,
    isAdmin,
  };

  return <context.Provider value={exposed}>{children}</context.Provider>;
};

export const useUser = () => useContext(context);
