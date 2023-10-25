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
  const [feedbacks, setFeedbacks] = useState(null);
  const [feedbackCounter, setFeedbackCounter] = useState();
  const [feedbackAverage, setFeedbackAverage] = useState();
  const [options, setOptions] = useState({});
  const [courses, setCourses] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState();

  const getCourses = async () => {
    const { data } = await supabaseClient.from("classes").select();

    if (data) setCourses(data);
  };

  useEffect(() => {
    if (Profile) getCourses();
  }, [Profile]);

  useEffect(() => {
    if (courses) {
      const optionsObj = courses.map((course) => ({
        value: course.id,
        label: course.name,
      }));

      setOptions(optionsObj);
      setSelectedCourse(optionsObj[0]);
    }
  }, [courses]);

  const calculateAverage = (feedbacks) => {
    if (feedbacks) {
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
    }
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
      .eq("class_id", selectedCourse?.value);

    setFeedbackAverage(calculateAverage(data));
    setFeedbackCounter(data?.length);
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [selectedCourse]);

  return (
    <div className="h-full w-full bg-white shadow-sm flex flex-col rounded-2xl p-6 space-y-10 overflow-y-auto">
      <h1 className="text-slate-800 font-semibold text-lg">{tab}</h1>
      <div className="flex items-center pr-5 gap-3">
        <Select
          options={options}
          value={selectedCourse}
          onChange={(val) => setSelectedCourse(val)}
        />
        <h2 className="ml-auto text-base font-semibold text-slate-800">
          Feedbacks: {feedbackCounter}
        </h2>
        <h2 className="ml-auto text-base font-semibold text-slate-800">
          Average: {feedbackAverage}{" "}
        </h2>{" "}
        <AiFillStar size={18} />
      </div>

      {tab === "Dashboard" && (
        <div className="space-y-4 ">
          {feedbacks?.map((feedback, id) => (
            <AdminItem key={id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContent;
