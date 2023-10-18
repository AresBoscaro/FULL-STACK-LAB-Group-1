"use client";
import { BiChevronDown } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/app/lib/supabase";
import { useUser } from "@/app/context/user-provider";

const StudentItem = ({ course }) => {
  /* Current user  */
  /* Get moduli  */
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const { Profile } = useUser();

  const toggleItem = () => {
    setShowFeedbacks(!showFeedbacks);
  };

  console.log(course);
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
    await supabaseClient.from("feedbacks").insert({
      metadata: {
        rating: stars,
        comment: comment,
      },
      class_id: course.id,
      profile_id: Profile.id,
    });
  };

  return (
    <div className="w-full rounded-2xl p-6 bg-slate-200 flex flex-col gap-3">
      <div className="flex items-center w-full">
        <div className="flex gap-28">
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
        <div className="w-full py-2 flex items-center gap-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full resize-none p-2 rounded"
          />
          <div
            className="py-2 px-4 rounded-xl hover:bg-slate-400/40 cursor-pointer transition-all ml-auto flex items-center gap-2"
            onClick={saveFeedback}
          >
            {/* <AiFillSave size={14} className="text-slate-700" /> */}
            <h3 className="text-sm font-regular text-slate-900">Save</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StudentItem;
