"use client";

import { useRouter } from "next/navigation";
import Logo from "../components/Logo";
import SignUpForm from "../components/(auth)/SignUpForm";

const SignUp = () => {
  const router = useRouter();

  const inputsL = [
    {
      label: "First Name",
      type: "text",
    },
    {
      label: "Last Name",
      type: "text",
    },
    {
      label: "ID",
      type: "text",
    },
  ];
  const inputsR = [
    {
      label: "Email",
      type: "email",
    },
    {
      label: "Password",
      type: "password",
    },
    {
      label: "Confirm Password",
      type: "password",
    },
  ];

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo />
      <SignUpForm
        title={"Create an account"}
        inputsL={inputsL}
        inputsR={inputsR}
        redirectLabel={"Do you have an account yet?"}
        redirectSpan={"Sign in"}
        onRedirect={() => router.push("/")}
      />
    </div>
  );
};

export default SignUp;
