import Logo from "@/app/components/Logo";
import AuthForm from "@/app/components/forms/AuthForm";

const InsertNewPassword = () => {
  const inputs = [
    {
      label: "New password",
      type: "password",
      name: "password",
    },
  ];

  return (
    <div className="p-6 flex justify-between w-full h-full">
      <Logo textColor={"text-white"} />
      <AuthForm
        title={"Insert new password"}
        actionLabel={"Confirm"}
        inputs={inputs}
      />
    </div>
  );
};

export default InsertNewPassword;
