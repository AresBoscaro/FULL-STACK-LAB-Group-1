/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { BiChevronDown } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/app/lib/supabase";
import { useUser } from "@/app/context/user-provider";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const StudentItem = ({ course }) => {
  /* Current user  */
  /* Get moduli  */
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const { Profile, getFeedbacks } = useUser();

  const toggleItem = () => {
    setShowFeedbacks(!showFeedbacks);
  };

  const updateRating = (index) => {
    setStars(index + 1);
  };

  const setFeedback = () => {
    if (course.feedback) {
      setComment(course.feedback.comment);
      setStars(course.feedback.rating);
    }
  };

  useEffect(() => {
    setFeedback();
  }, [course.feedback]);

  const saveFeedback = async () => {
    setIsLoading(true);
    /* Check if there is already a feedback */
    console.log("course", course.feedback);
    console.log("profile", Profile);

    if (!course.feedback) {
      const { data, error } = await supabaseClient.from("feedbacks").insert({
        metadata: {
          rating: stars,
          comment: comment,
        },
        class_id: course.id,
        profile_id: Profile.id,
      });

      if (error) {
        toast.error("Something gone wrong");
      } else {
        toast.success("Feedback successfully inserted!");
      }
      getFeedbacks();
      setIsLoading(false);
      return;
    }
    /* If there is not update the current feedback */
    const { data, error } = await supabaseClient
      .from("feedbacks")
      .update({
        metadata: {
          rating: stars,
          comment: comment,
        },
        class_id: course.id,
        profile_id: Profile.id,
      })
      .eq("id", course.feedback.id);

    if (error) {
      toast.error("Something gone wrong");
    } else {
      toast.success("Feedback successfully updated!");
    }

    getFeedbacks();
    setIsLoading(false);
  };

  return (
    <div className="w-full rounded-2xl p-6 bg-slate-200 flex flex-col gap-3">
      <div className="flex items-center w-full">
        <div className="flex items-center gap-28">
          <h1 className="text-base font-semibold text-slate-800">
            {course.name}
          </h1>
          <div className="flex gap-3">
            {[...Array(5)].map((_, index) =>
              index < stars ? (
                <AiFillStar
                  size={18}
                  key={index}
                  className="hover:text-slate-900 cursor-pointer transition-all text-slate-900"
                  onClick={() => updateRating(index)}
                />
              ) : (
                <AiOutlineStar
                  size={18}
                  key={index}
                  className="hover:text-slate-900 cursor-pointer transition-all text-slate-600"
                  onClick={() => updateRating(index)}
                />
              )
            )}
          </div>
        </div>
        <div
          className="p-2 rounded-xl hover:bg-slate-400/40 cursor-pointer transition-all ml-auto"
          onClick={toggleItem}
        >
          <BiChevronDown
            size={18}
            className="text-slate-900"
            style={{
              rotate: showFeedbacks ? "180deg" : "0deg",
            }}
          />
        </div>
      </div>

      {showFeedbacks ? (
        <div className="w-full py-2 flex items-end justify-between gap-6">
          <div className="flex flex-col w-full">
            <h1 className="text-sm font-regular text-slate-900 w-full p-2 bg-slate-600/40 rounded-t-xl">
              Leave a comment
            </h1>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full resize-none p-2 outline-none text-slate-800 text-sm font-light rounded-b-xl"
            />
          </div>
          <div
            className="h-10 w-20 rounded-xl bg-slate-600/40 cursor-pointer transition-all ml-auto flex items-center justify-center"
            onClick={saveFeedback}
          >
            {isLoading ? (
              <BeatLoader size={6} color="rgb(15,23,42)" />
            ) : (
              <h3 className="text-sm font-regular text-slate-900">Save</h3>
            )}
          </div>
        </div>
      ) : null}

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
    </div>
  );
};

export default StudentItem;
