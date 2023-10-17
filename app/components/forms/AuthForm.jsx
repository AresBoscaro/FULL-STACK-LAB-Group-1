/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const AuthForm = ({
  title,
  subtitle,
  onRedirect,
  redirectLabel,
  redirectSpan,
  inputs,
  actionLabel,
}) => {
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
    });
  };

  return (
    <div className="p-6 rounded-2xl h-full w-[430px] flex flex-col justify-between shadow-sm bg-white">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-bold text-xl text-zinc-900">{title}</h1>
        <p className="font-light text-zinc-500 text-sm">{subtitle}</p>
      </div>
      <div>
        {inputs?.map((input, id) => (
          <div key={id} className="mt-8">
            <h3 className="text-base font-regular text-zinc-900">
              {input.label}
            </h3>
            <input
              name={input.name}
              type={input.type}
              onChange={(e) =>
                input.name === "email"
                  ? setEmail(e.target.value)
                  : setPassword(e.target.value)
              }
              className="w-full p-2 rounded-lg border-[1px] border-slate-900/40 outline-none"
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
        <ActionFormButton label={actionLabel} onClick={handleSignUp} />
        <div className="w-full flex justify-center mt-2">
          <p className="text-xs font-light text-zinc-500">
            {redirectLabel}{" "}
            <span
              className="font-semibold text-zinc-900 text-sm cursor-pointer"
              onClick={onRedirect}
            >
              {redirectSpan}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

const ActionFormButton = ({ onClick, label }) => {
  return (
    <button
      className="w-full rounded-xl p-2 text-center bg-slate-900"
      onClick={onClick}
    >
      <h3 className="text-white font-semibold text-lg">{label}</h3>
    </button>
  );
};
