/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname } from "next/navigation";
import { useBoard } from "../../context/boards-provider";
import StudentItem from "./StudentItem";
import AdminItem from "./AdminItem";
import ProfileManager from "./ProfileManager";
import { useUser } from "@/app/context/user-provider";
import { supabaseClient } from "@/app/lib/supabase";
import { useEffect, useState } from "react";
import Select from "react-select";

const MainContent = () => {
  const { tab } = useBoard();
  const { Profile } = useUser();

  const pathname = usePathname();
  const [selectedClass, setSelectedClass] = useState(0);
  const [defaultClass, setDefaultClass] = useState();
  const [feedbacks, setFeedbacks] = useState([]);
  const [options, setOptions] = useState();

  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const { data, error } = await supabaseClient.from("classes").select();

    console.log(data);

    /* Map courses to options */
    const formattedOptions = data.map((course) => ({
      value: course.id,
      label: course.name,
    }));

    setDefaultClass(formattedOptions[0]);
    setOptions(formattedOptions);
  };

  const handleChange = (choice) => {
    setSelectedClass(choice.value);
  };

  const fetchFeedbacks = async () => {
    const { data, error } = await supabaseClient
      .from("feedbacks")
      .select(
        `
        id,
        metadata,
        class_id,
        profiles (students (first_name, last_name, stud_id))
      `
      )
      .eq("class_id", selectedClass);
    console.log(data);
    setFeedbacks(data);
  };

  useEffect(() => {
    if (Profile) getCourses();
  }, [Profile]);

  useEffect(() => {
    fetchFeedbacks();
  }, [selectedClass]);

  return (
    <div className="h-full w-full bg-white shadow-sm flex flex-col rounded-2xl p-6 space-y-10 overflow-y-auto">
      <h1 className="text-slate-800 font-semibold text-lg">{tab}</h1>
      <div className="flex ">
        <Select
          options={options}
          defaultValue={defaultClass}
          onChange={(choice) => handleChange(choice)}
        />
      </div>

      {tab === "Dashboard" && (
        <div className="space-y-4 ">
          {feedbacks.map((feedback, id) => (
            <AdminItem key={id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContent;
