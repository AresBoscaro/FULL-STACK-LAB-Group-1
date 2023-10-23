import { BsChevronDown } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";

const AdminItem = ({ feedback }) => {
  /* Current user  */
  /* Get moduli  */
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const toggleItem = () => {
    setShowFeedbacks(!showFeedbacks);
  };

  return (
    <div className="w-full rounded-2xl p-6 bg-slate-200 flex flex-col gap-3">
      <div className="flex items-center w-full">
        <div className="flex items-center gap-28">
          <h1 className="text-base font-semibold text-slate-800">
            {feedback.profiles.students.first_name +
              " " +
              feedback.profiles.students.last_name +
              "            " +
              feedback.profiles.students.stud_id}
          </h1>
          <div className="flex gap-3">
            {[...Array(5)].map((_, index) =>
              index < feedback.metadata.rating ? (
                <AiFillStar
                  size={18}
                  key={index}
                  className="hover:text-slate-900 cursor-pointer transition-all text-slate-900"
                />
              ) : (
                <AiOutlineStar
                  size={18}
                  key={index}
                  className="hover:text-slate-900 cursor-pointer transition-all text-slate-600"
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
              Comment
            </h1>
            <textarea
              value={feedback.metadata.comment}
              className="w-full resize-none p-2 outline-none text-slate-800 text-sm font-light rounded-b-xl"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminItem;
