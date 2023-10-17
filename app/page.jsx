"use client";

import { useRouter } from "next/navigation";
import Logo from "./components/Logo";
import SignInForm from "./components/forms/SignInForm";

const SignIn = () => {
  const router = useRouter();

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo textColor={"text-white"} />
      <SignInForm onRedirect={() => router.push("sign-up")} />
    </div>
  );
};

export default SignIn;
