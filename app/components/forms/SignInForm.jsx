/* eslint-disable react/no-unescaped-entities */

import ActionFormButton from "../ActionFormButton";

const SignInForm = ({ onRedirect }) => {
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
    <div className="p-6 rounded-2xl h-full w-[430px] flex flex-col justify-between shadow-sm bg-white">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-bold text-xl text-zinc-900">Welcome Student</h1>
        <p className="font-light text-zinc-500 text-sm">
          Please enter your credentials
        </p>
      </div>
      <div>
        {inputs?.map((input, id) => (
          <div key={id} className="mt-8">
            <h3 className="text-base font-semibold text-zinc-900">
              {input.label}
            </h3>
            <input
              name={input.name}
              type={input.type}
              className="w-full p-2 rounded-lg border-[1px] border-slate-900/40 mt-4 outline-none"
            />
          </div>
        ))}
        <div className="w-full text-right mt-2">
          <p className="text-xs font-light text-zinc-500">
            Forgot the password?
          </p>
        </div>
      </div>
      <div>
        <ActionFormButton label={"Sign In"} />
        <div className="w-full flex justify-center mt-2">
          <p className="text-xs font-light text-zinc-500">
            Don't have an account?{" "}
            <span
              className="font-semibold text-zinc-900 text-sm cursor-pointer"
              onClick={onRedirect}
            >
              Create
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
