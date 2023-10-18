/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [Profile, setProfile] = useState(null);

  const supabase = createClientComponentClient();

  const handleUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) setUser(user);
  };

  const getProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", User.id);

    if (!error) setProfile(data[0]);
  };

  useEffect(() => {
    handleUser();
  }, []);

  useEffect(() => {
    console.log("user", User);
    if (User) getProfile();
    console.log("profile", Profile);
  }, [User]);

  const exposed = {
    User,
    setUser,
    Profile,
    setProfile,
  };

  return <context.Provider value={exposed}>{children}</context.Provider>;
};

export const useUser = () => useContext(context);
