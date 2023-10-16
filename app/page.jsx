"use client";

import { useRouter } from "next/navigation";
import Logo from "./components/Logo";
import SignInForm from "./components/(auth)/SignInForm";

const SignIn = () => {
  const router = useRouter();

  const inputs = [
    {
      label: "Email",
      type: "email",
    },
    {
      label: "Password",
      type: "password",
    },
  ];

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo />
      <SignInForm
        title={"Welcome Student"}
        subtitle={"Please enter your credentials"}
        inputs={inputs}
        redirectLabel={"Don't have an account?"}
        redirectSpan={"Create"}
        onRedirect={() => router.push("Sign-up")}
      />
    </div>
  );
};

export default SignIn;
