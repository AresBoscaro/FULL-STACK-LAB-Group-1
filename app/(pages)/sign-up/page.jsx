"use client";

import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";
import SignUpForm from "@/app/components/forms/SignUpForm";

const SignUp = () => {
  const router = useRouter();

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo textColor={"text-white"} />
      <SignUpForm
        redirectLabel={"Do you have an account yet?"}
        redirectSpan={"Sign in"}
        onRedirect={() => router.push("/")}
      />
    </div>
  );
};

export default SignUp;
