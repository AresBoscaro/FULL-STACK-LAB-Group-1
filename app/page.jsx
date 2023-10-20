/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import AuthForm from "../components/forms/AuthForm";
import { useUser } from "../providers/user-provider";
import { useEffect } from "react";
import Logo from "../components/Logo";

const SignIn = () => {
  const { Profile } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (Profile) {
      if (Profile.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [Profile]);

  const inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
    },
  ];

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo textColor={"text-white"} />
      <AuthForm
        title={"Welcome Student"}
        subtitle={"Please enter your credentials"}
        actionLabel={"Sign In"}
        onRedirect={() => router.push("/sign-up")}
        redirectLabel={"Don't have an account?"}
        redirectSpan={"Create"}
        inputs={inputs}
      />
    </div>
  );
};

export default SignIn;
