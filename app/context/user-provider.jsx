/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  const supabase = createClientComponentClient();

  const handleUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) setUser(user);
  };

  useEffect(() => {
    handleUser();
  }, []);

  useEffect(() => {
    console.log("user", User);
  }, [User]);

  const exposed = {
    User,
    setUser,
  };

  return <context.Provider value={exposed}>{children}</context.Provider>;
};

export const useUser = () => useContext(context);
