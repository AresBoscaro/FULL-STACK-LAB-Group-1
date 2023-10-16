"use client";

import { useRouter } from "next/navigation";
import Logo from "../components/Logo";
import SignUpForm from "../components/(auth)/SignUpForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const SignUp = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo />
      <SignUpForm
        redirectLabel={"Do you have an account yet?"}
        redirectSpan={"Sign in"}
        onRedirect={() => router.push("/")}
      />
    </div>
  );
};

export default SignUp;
