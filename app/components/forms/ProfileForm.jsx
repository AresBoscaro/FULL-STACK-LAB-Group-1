/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useUser } from "@/app/context/user-provider";
import toast, { Toaster } from "react-hot-toast";
import { supabaseClient } from "@/app/lib/supabase";

export default function ProfileForm() {
  const { Profile, getProfile } = useUser();
  const [name, setName] = useState(Profile?.first_name || "");
  const [lastname, setLastname] = useState(Profile?.last_name || "");
  const [matricola, setMatricola] = useState(Profile?.stud_id || "");

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

    const { data, error } = await supabaseClient
      .from("profiles")
      .update(updatedUserData)
      .eq("id", Profile.id);

    if (error) {
      console.error("Error updating user:", error.message);
      toast.error(error.message);
      return null; // Handle the error as needed
    } else {
      toast.success("Profile successfully updated!");
      getProfile();
    }

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
            <h3 className="text-sm font-regular text-slate-900">
              {input.label}
            </h3>
            <input
              name={input.name}
              type={input.type}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border-[1px] border-slate-900/40 outline-none text-slate-600"
              value={input.value}
            />
          </div>
        ))}
      </div>
      <ConfirmButton onClick={updateUser} />
    </form>
  );
}

function ConfirmButton({ onClick }) {
  return (
    <button
      className="w-full rounded-xl p-2 text-center bg-slate-900"
      onClick={onClick}
      type="submit"
    >
      <h3 className="text-white font-semibold text-lg">Confirm</h3>
    </button>
  );
}
