/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/user-provider";
import { supabaseClient } from "@/app/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

const AuthForm = ({
  title,
  subtitle,
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
  const [isLoading, setIsLoading] = useState(false);

  const { User, setUser } = useUser();

  const handleSignIn = async () => {
    setIsLoading(true);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (data) setUser(data.user);

    if (error) toast.error(error.message);

    setIsLoading(false);
  };

  const handleSignUp = async () => {
    setIsLoading(true);

    if (
      email.trim() &&
      password.trim() &&
      fname.trim() &&
      lname.trim() &&
      studId.trim()
    ) {
      //check if stud exists in students table - all fields
      const { data: studData, error: studError } = await supabaseClient
        .from("students")
        .select()
        .eq("first_name", fname)
        .eq("last_name", lname)
        .eq("stud_id", studId);

      if (studData.length > 0) {
        const { data: userData, error: userError } =
          await supabaseClient.auth.signUp({
            email,
            password,
          });

        if (userData) setUser(userData.user);

        if (userError) toast.error(userError.message);
      } else {
        toast.error("Vai a rubbbare");
      }

      setIsLoading(false);
    } else {
      toast.error("All fields are required");
    }
  };

  // const handleUpdateProfile = async () => {
  //   if (User) {
  //     await supabaseClient
  //       .from("profiles")
  //       .update({
  //         stud_id: studId,
  //       })
  //       .eq("id", User.id);
  //   }
  // };

  // useEffect(() => {
  //   handleUpdateProfile();
  // }, [User]);

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
      className={`p-6 rounded-2xl w-[430px] flex flex-col justify-between shadow-xl bg-white ${
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
          isLoading={isLoading}
        />
        <div className="w-full flex justify-center mt-2">
          <p className="text-xs font-light text-slate-500">
            {redirectLabel}{" "}
            <span
              className="font-semibold text-slate-800 text-sm cursor-pointer"
              onClick={() => router.push("/sign-up")}
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
  isLoading,
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
      <h3 className="text-white font-semibold text-lg">
        {isLoading ? <BeatLoader size={8} color="white" /> : label}
      </h3>
    </button>
  );
};
