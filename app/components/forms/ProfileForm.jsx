/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ProfileForm() {
  const supabase = createClientComponentClient();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [matricola, setMatricola] = useState("");

  const inputs = [
    {
      label: "Name",
      type: "name",
      name: "name",
    },
    {
      label: "Lastname",
      type: "lastname",
      name: "lastname",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
    },
    {
      label: "Matricola",
      type: "matricola",
      name: "matricola",
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
      case "matricola":
        setMatricola(value);
        break;
      default:
        break;
    }
  };

  async function updateUser(userId, updatedUserData) {
    const { data, error } = await supabase
      .from("profiles")
      .update(updatedUserData)
      .eq("id", userId);

    if (error) {
      console.error("Error updating user:", error);
      return null; // Handle the error as needed
    }

    return data; // The updated user data
  }

  return (
    <div className="p-6 rounded-2xl h-full w-[430px] flex flex-col justify-between shadow-sm bg-white">
      <div>
        {inputs.map((input, id) => (
          <div key={id} className="mt-8">
            <h3 className="text-base font-regular text-zinc-900">
              {input.label}
            </h3>
            <input
              name={input.name}
              type={input.type}
              onChange={(e) => handleInputChange}
              className="w-full p-2 rounded-lg border-[1px] border-slate-900/40 outline-none"
            />
          </div>
        ))}
      </div>
      <ConfirmButton />
    </div>
  );
}

function ConfirmButton() {
  return (
    <button
      className="w-full rounded-xl p-2 text-center bg-slate-900"
      onClick={() => updateUser()}
    >
      <h3 className="text-white font-semibold text-lg">confirm</h3>
    </button>
  );
}
