/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import Logo from "./components/Logo";
import AuthForm from "./components/forms/AuthForm";
import { useUser } from "./context/user-provider";
import { useEffect } from "react";

const SignIn = () => {
  const { User } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (User) router.push("/dashboard");
  }, [User]);

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
