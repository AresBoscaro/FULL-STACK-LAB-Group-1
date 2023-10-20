/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/providers/user-provider";
import { supabaseClient } from "@/app/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
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
  const router = useRouter();

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [studId, setStudId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { User, setUser } = useUser();

  const handleSignUp = async () => {
    if (email.trim() && password.trim()) {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (data) setUser(data.user);

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
      }
    } else {
      toast.error("All fields are required");
    }
  };

  const handleUpdateProfile = async () => {
    if (User) {
      if (fname.trim() && lname.trim() && studId.trim()) {
        await supabaseClient
          .from("profiles")
          .update({
            first_name: fname,
            last_name: lname,
            stud_id: studId,
          })
          .eq("id", User.id);
      } else {
        toast.error("All fields are required");
      }
    }
  };

  useEffect(() => {
    handleUpdateProfile();
  }, [User]);

  const handleSignIn = async () => {
    if (email.trim() && password.trim()) {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (!error) {
        setUser(data.user);
      } else {
        toast.error(error.message);
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
      }
    } else {
      toast.error("All fields are required");
    }
  };

  const handleSendResetEmail = async () => {
    if (email.trim()) {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `http://localhost:3000/insert-new-password`,
      });

      if (!error) toast.success("Email successfully sent");
    } else {
      toast.error("Enter an email address");
    }
  };

  const handleResetPassword = async () => {
    if (password.trim()) {
      const { data, error } = await supabaseClient.auth.updateUser({
        password: password,
      });

      if (data) {
        toast.success("Password successfully updated");
        router.push("/");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error("Enter a password");
    }
  };

  return (
    <form
      className={`p-6 rounded-2xl w-[430px] flex flex-col justify-between shadow-sm bg-white ${
        actionLabel === "Send Email" || actionLabel === "Confirm"
          ? "h-[40%]"
          : "h-full"
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col w-full items-center">
        <h1 className="font-bold text-xl text-slate-900">{title}</h1>
        <p className="font-light text-zinc-500 text-sm">{subtitle}</p>
      </div>
      <div>
        {inputs?.map((input, id) => (
          <div key={id} className="mt-4">
            <h3 className="text-sm font-regular text-slate-700">
              {input.label}
            </h3>
            <input
              name={input.name}
              type={input.type}
              onChange={(e) =>
                input.name === "fname"
                  ? setFName(e.target.value)
                  : input.name === "lname"
                  ? setLName(e.target.value)
                  : input.name === "email"
                  ? setEmail(e.target.value)
                  : input.name === "id"
                  ? setStudId(e.target.value)
                  : setPassword(e.target.value)
              }
              className="w-full p-2 rounded-lg border-[1px] border-slate-700/40 outline-none"
            />
          </div>
        ))}
        {actionLabel === "Sign In" && (
          <div
            className="w-full text-right mt-2 cursor-pointer"
            onClick={() => router.push("/reset-password")}
          >
            <p className="text-xs font-light text-slate-500 hover:text-slate-900">
              Forgot the password?
            </p>
          </div>
        )}
      </div>
      <Toaster position="bottom-left" />
      <div>
        <ActionFormButton
          label={actionLabel}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          onSendEmail={handleSendResetEmail}
          onResetPassword={handleResetPassword}
        />
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
    </form>
  );
};

export default AuthForm;

const ActionFormButton = ({
  onSignIn,
  onSignUp,
  onSendEmail,
  onResetPassword,
  label,
}) => {
  return (
    <button
      className="w-full rounded-xl p-2 text-center bg-slate-900"
      onClick={
        label === "Sign In"
          ? onSignIn
          : label === "Sign Up"
          ? onSignUp
          : label === "Send Email"
          ? onSendEmail
          : onResetPassword
      }
      type="submit"
    >
      <h3 className="text-white font-semibold text-lg">{label}</h3>
    </button>
  );
};
