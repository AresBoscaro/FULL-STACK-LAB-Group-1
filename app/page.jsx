import Form from "./components/Form";
import Logo from "./components/Logo";

const SignIn = () => {
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
      <Form
        title={"Welcome Student"}
        subtitle={"Please enter your credentials"}
        inputs={inputs}
      />
    </div>
  );
};

export default SignIn;
