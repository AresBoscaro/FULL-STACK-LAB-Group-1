/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/context/user-provider";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileForm() {
  const supabase = createClientComponentClient();

  const { Profile } = useUser();
  const [name, setName] = useState(Profile.first_name);
  const [lastname, setLastname] = useState(Profile.last_name);
  const [matricola, setMatricola] = useState(Profile.stud_id);

  const inputs = [
    {
      label: "Name",
      type: "name",
      name: "name",
      value: name,
    },
    {
      label: "Last Name",
      type: "lastname",
      name: "lastname",
      value: lastname,
    },
    {
      label: "ID",
      type: "matricola",
      name: "matricola",
      value: matricola,
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

  async function updateUser() {
    const updatedUserData = {};

    if (name !== Profile?.first_name) {
      updatedUserData.first_name = name;
    }
    if (lastname !== Profile?.last_name) {
      updatedUserData.last_name = lastname;
    }
    if (matricola !== Profile?.stud_id) {
      updatedUserData.stud_id = matricola;
    }

    console.log(updatedUserData);

    if (Object.keys(updatedUserData).length === 0) return;

    const { data, error } = await supabase
      .from("profiles")
      .update(updatedUserData)
      .eq("id", Profile.id);

    if (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user:", error);
      return null; // Handle the error as needed
    } else {
      toast.success("Profile successfully updated!");
    }

    return data;
  }

  return (
    <div className="p-6 rounded-2xl h-full w-[430px] flex flex-col justify-between shadow-sm bg-white">
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
          },
        }}
      />
      <div>
        {inputs.map((input, id) => (
          <div key={id} className="mt-8">
            <h3 className="text-base font-regular text-zinc-900">
              {input.label}
            </h3>
            <input
              name={input.name}
              type={input.type}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border-[1px] border-slate-900/40 outline-none"
              value={input.value}
            />
          </div>
        ))}
      </div>
      <ConfirmButton onClick={updateUser} />
    </div>
  );
}

function ConfirmButton({ onClick }) {
  return (
    <button
      className="w-full rounded-xl p-2 text-center bg-slate-900"
      onClick={onClick}
    >
      <h3 className="text-white font-semibold text-lg">Confirm</h3>
    </button>
  );
}
