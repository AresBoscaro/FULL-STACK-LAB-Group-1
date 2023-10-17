const MainContent = ({ title, items }) => {
  return (
    <div className="h-full w-full bg-white shadow-sm flex flex-col rounded-2xl p-6">
      <h1 className="text-slate-800 font-semibold text-lg">{title}</h1>
    </div>
  );
};

export default MainContent;
