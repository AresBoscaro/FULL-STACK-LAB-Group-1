/* "use client";
 */
import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";
import AuthForm from "@/app/components/forms/AuthForm";

const SignUp = () => {
  const router = useRouter();

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
        title={"Create an account"}
        actionLabel={"Sign Up"}
        inputs={inputs}
      />
    </div>
  );
};

export default SignUp;
