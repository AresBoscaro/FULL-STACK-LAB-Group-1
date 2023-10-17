/* eslint-disable react/no-unescaped-entities */

"use client";

import { useRouter } from "next/navigation";

const Unauthenticated = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-6 items-center justify-center h-full">
      <h1 className="text-2xl text-slate-900 font-bold">
        You shouldn't be here, please Sign In before
      </h1>
      <button
        className="px-6 py-2 bg-white rounded-xl text-slate-700 hover:bg-slate-900 hover:text-white transition-all"
        onClick={() => router.push("/")}
      >
        Sign In
      </button>
    </div>
  );
};

export default Unauthenticated;
