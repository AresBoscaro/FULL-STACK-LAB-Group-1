/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";
import AuthForm from "@/app/components/forms/AuthForm";
import { useUser } from "@/app/context/user-provider";
import { useEffect } from "react";

const SignUp = () => {
  const router = useRouter();

  const { Profile } = useUser();

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
      label: "First Name",
      type: "text",
      name: "fname",
    },
    {
      label: "Last Name",
      type: "text",
      name: "lname",
    },
    {
      label: "ID",
      type: "text",
      name: "id",
    },
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
        title={"Create an account"}
        actionLabel={"Sign Up"}
        inputs={inputs}
      />
    </div>
  );
};

export default SignUp;
