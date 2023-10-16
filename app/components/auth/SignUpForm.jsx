import ActionFormButton from "../ActionFormButton";

const SignUpForm = ({ onRedirect }) => {
  const inputsL = [
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
  ];
  const inputsR = [
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
    {
      label: "Confirm Password",
      type: "password",
      name: "cpassword",
    },
  ];

  return (
    <div className="py-6 px-16 bg-white/40 rounded-2xl h-full w-[860px] flex flex-col justify-between shadow-sm">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-bold text-xl text-zinc-900">Create an account</h1>
      </div>
      <div className="flex items-start w-full justify-center gap-10">
        <div className="w-full">
          {inputsL?.map((input, id) => (
            <div key={id} className="mt-8">
              <h3 className="text-base font-semibold text-zinc-900">
                {input.label}
              </h3>
              <input
                name={input.name}
                type={input.type}
                className="w-full p-2 rounded-lg border-[1px] border-zinc-500/40 mt-4 outline-none"
              />
            </div>
          ))}
        </div>
        <div className="w-full">
          {inputsR?.map((input, id) => (
            <div key={id} className="mt-8">
              <h3 className="text-base font-semibold text-zinc-900">
                {input.label}
              </h3>
              <input
                name={input.name}
                type={input.type}
                className="w-full p-2 rounded-lg border-[1px] border-zinc-500/40 mt-4 outline-none"
              />
            </div>
          ))}
          <div className="w-full text-right mt-2">
            <p className="text-xs font-light text-zinc-500">
              Forgot the password?
            </p>
          </div>
        </div>
      </div>
      <div>
        <ActionFormButton label={"Sign Up"} />
        <div className="w-full flex justify-center mt-2">
          <p className="text-xs font-light text-zinc-500">
            Do you have an account?{" "}
            <span
              className="font-semibold text-zinc-900 text-sm cursor-pointer"
              onClick={onRedirect}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
