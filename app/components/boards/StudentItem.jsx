import { GoKebabHorizontal } from "react-icons/go";

const StudentItem = () => {
  return (
    <div className="w-full rounded-2xl p-6 bg-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-28">
        <h1 className="text-base font-semibold text-slate-800">Class</h1>
        <h1 className="text-base font-semibold text-slate-800">Grade</h1>
      </div>
      <div className="p-2 rounded-xl hover:bg-slate-400/40 cursor-pointer transition-all">
        <GoKebabHorizontal size={18} className="text-slate-900 rotate-90" />
      </div>
    </div>
  );
};

export default StudentItem;
