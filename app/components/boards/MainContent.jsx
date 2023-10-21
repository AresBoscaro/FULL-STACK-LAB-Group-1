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

const MainContent = () => {
  const { tab } = useBoard();
  const { Profile } = useUser();

  const pathname = usePathname();

  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const { data, error } = await supabaseClient.from("classes").select();

    if (!Profile.feedbacks) {
      setCourses(data);
    }

    const mergedCourses = data.reduce((acc, course) => {
      const courseFeedbacks = Profile.feedbacks?.filter(
        (feedback) => feedback.class_id === course.id
      );
      acc.push({
        ...course,
        feedback: courseFeedbacks
          ? { id: courseFeedbacks[0]?.id, ...courseFeedbacks[0]?.metadata }
          : null,
      });
      return acc;
    }, []);

    setCourses(mergedCourses);
  };

  useEffect(() => {
    if (Profile) getCourses();
  }, [Profile]);

  return (
    <div className="h-full w-full bg-white shadow-sm flex flex-col rounded-2xl p-6 space-y-10 overflow-y-auto">
      <h1 className="text-slate-800 font-semibold text-lg">{tab}</h1>
      {tab === "Dashboard" && (
        <div className="space-y-4 ">
          {courses.map((course, id) =>
            pathname === "/dashboard" ? (
              <StudentItem key={id} course={course} />
            ) : (
              <AdminItem key={id} />
            )
          )}
        </div>
      )}
      {tab == "Profile" && <ProfileManager />}
    </div>
  );
};

export default MainContent;
