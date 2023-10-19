import Logo from "@/app/components/Logo";
import AuthForm from "@/app/components/forms/AuthForm";

const ResetPassword = () => {
  const inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
    },
  ];

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo textColor={"text-white"} />
      <AuthForm
        title={"Reset your password"}
        actionLabel={"Send Email"}
        inputs={inputs}
      />
    </div>
  );
};

export default ResetPassword;
