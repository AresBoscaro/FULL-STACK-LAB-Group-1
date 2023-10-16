"use client";

import { useRouter } from "next/navigation";
import Logo from "./components/Logo";
import SignInForm from "./components/(auth)/SignInForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const SignIn = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo />
      <SignInForm onRedirect={() => router.push("sign-up")} />
    </div>
  );
};

export default SignIn;
