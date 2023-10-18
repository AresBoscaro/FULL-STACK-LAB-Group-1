/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabase";

const context = createContext();

export const UserProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [Profile, setProfile] = useState(null);

  const handleUser = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (user) setUser(user);
  };

  const getProfile = async () => {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select()
      .eq("id", User.id);

    if (!error) setProfile(data[0]);
  };

  useEffect(() => {
    handleUser();
  }, []);

  useEffect(() => {
    if (User) getProfile();
  }, [User]);

  useEffect(() => {
    if (Profile) console.log("profile", Profile);
  }, [Profile]);

  const exposed = {
    User,
    setUser,
    Profile,
    setProfile,
  };

  return <context.Provider value={exposed}>{children}</context.Provider>;
};

export const useUser = () => useContext(context);
