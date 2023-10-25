/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/user-provider";
import toast, { Toaster } from "react-hot-toast";
import { supabaseClient } from "@/app/lib/supabase";
import { BeatLoader } from "react-spinners";

export default function ProfileForm() {
  const { Profile, getProfile } = useUser();
  const [name, setName] = useState(Profile?.first_name || "");
  const [lastname, setLastname] = useState(Profile?.last_name || "");
  const [matricola, setMatricola] = useState(Profile?.stud_id || "");
  const [isLoading, setIsLoading] = useState(false);

  const inputs = [
    {
      label: "Name",
      type: "name",
      name: "name",
      value: name,
      disable: false,
    },
    {
      label: "Last Name",
      type: "lastname",
      name: "lastname",
      value: lastname,
      disable: false,
    },
    {
      label: "ID",
      type: "matricola",
      name: "matricola",
      value: matricola,
      disable: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  async function updateUser() {
    setIsLoading(true);

    const updatedUserData = {};

    if (name !== Profile?.first_name) {
      updatedUserData.first_name = name;
    }
    if (lastname !== Profile?.last_name) {
      updatedUserData.last_name = lastname;
    }

    if (Object.keys(updatedUserData).length === 0) return;

    const { data, error } = await supabaseClient
      .from("students")
      .update(updatedUserData)
      .eq("stud_id", Profile.stud_id);

    if (error) {
      console.error("Error updating user:", error.message);
      toast.error("Something gone wrong");
      return null; // Handle the error as needed
    } else {
      toast.success("Profile successfully updated!");
      getProfile();
    }

    setIsLoading(false);

    return data;
  }

  return (
    <form
      className="rounded-2xl h-full w-[430px] flex flex-col space-y-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            padding: "16px",
            marginBottom: "1.5rem",
            marginRight: "1.5rem",
            backgroundColor: "#F5F7F8",
          },
        }}
      />
      <div>
        {inputs.map((input, id) => (
          <div key={id} className="mt-8">
            <div className="flex flex-col w-full">
              <h1 className="text-sm font-regular text-slate-900 w-full p-2 bg-slate-600/40 rounded-t-lg">
                {input.label}
              </h1>
              <input
                name={input.name}
                type={input.type}
                onChange={handleInputChange}
                className="w-full resize-none p-2 outline-none text-slate-800 text-sm font-light rounded-b-lg shadow-xlm border-[1px] border-slate-300/40"
                value={input.value}
                disabled={input.disable}
              />
            </div>
          </div>
        ))}
      </div>
      <ConfirmButton onClick={updateUser} isLoading={isLoading} />
    </form>
  );
}

function ConfirmButton({ onClick, isLoading }) {
  return (
    <button
      className="w-full rounded-xl p-2 text-center bg-slate-900"
      onClick={onClick}
      type="submit"
    >
      <h3 className="text-white font-semibold text-lg">
        {isLoading ? <BeatLoader size={8} color="white" /> : "Confirm"}
      </h3>
    </button>
  );
}
