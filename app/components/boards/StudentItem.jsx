"use client";
import { BiChevronDown } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { useState } from "react";
import { supabaseClient } from "@/app/lib/supabase";

const StudentItem = () => {
  /* Current user  */
  /* Get moduli  */
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState(0);

  const toggleItem = () => {
    setShowFeedbacks(!showFeedbacks);
  };

  const updateRating = (index) => {
    setStars(index + 1);
  };

  const saveFeedback = async () => {
    console.log(comment);
    await supabaseClient.from("feedbacks").insert({});
  };

  return (
    <div className="w-full rounded-2xl p-6 bg-slate-200 flex flex-col gap-3">
      <div className="flex items-center w-full">
        <div className="flex gap-28">
          <h1 className="text-base font-semibold text-slate-800">Class</h1>
          <div className="flex gap-3">
            {[...Array(5)].map((_, index) =>
              index < stars ? (
                <AiFillStar
                  size={18}
                  key={index}
                  className="hover:color-white cursor-pointer transition-all"
                  onClick={() => updateRating(index)}
                />
              ) : (
                <AiOutlineStar
                  size={18}
                  key={index}
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
            className="p-2 rounded-xl hover:bg-slate-400/40 cursor-pointer transition-all ml-auto"
            onClick={saveFeedback}
          >
            <AiFillSave size={20} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StudentItem;
