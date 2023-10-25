/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useBoard } from "../../context/boards-provider";
import AdminItem from "./AdminItem";
import { useUser } from "@/app/context/user-provider";
import { supabaseClient } from "@/app/lib/supabase";
import { useEffect, useState } from "react";
import Select from "react-select";
import { AiFillStar } from "react-icons/ai";

const MainContent = () => {
  const { tab } = useBoard();
  const { Profile } = useUser();
  const [selectedClass, setSelectedClass] = useState(0);
  const [defaultClass, setDefaultClass] = useState();
  const [feedbacks, setFeedbacks] = useState([]);
  const [options, setOptions] = useState();
  const [feedbackCounter, setFeedbackCounter] = useState();
  const [feedbackAverage, setFeedbackAverage] = useState();

  const getCourses = async () => {
    const { data, error } = await supabaseClient.from("classes").select();

    /* Map courses to options */
    const formattedOptions = data.map((course) => ({
      value: course.id,
      label: course.name,
    }));

    setDefaultClass(formattedOptions[0]);
    setOptions(formattedOptions);
  };

  const calculateAverage = (feedbacks) => {
    const { sum, count } = feedbacks.reduce(
      (accumulator, obj) => {
        if (obj.metadata && typeof obj.metadata.rating === "number") {
          accumulator.sum += obj.metadata.rating;
          accumulator.count++;
        }
        return accumulator;
      },
      { sum: 0, count: 0 }
    );

    const averageRating = count > 0 ? sum / count : 0;
    return averageRating;
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

    setFeedbackAverage(calculateAverage(data));
    setFeedbackCounter(data.length);
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
      <div className="flex items-center pr-5 gap-3">
        <Select
          options={options}
          defaultValue={defaultClass}
          onChange={(choice) => handleChange(choice)}
        />
        <h2 className="ml-auto">Feedbacks: {feedbackCounter}</h2>
        <h2 className="ml-auto">Average: {feedbackAverage} </h2>{" "}
        <AiFillStar size={18} />
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
