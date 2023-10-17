import Logo from "./Logo";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <div className="h-full w-80 bg-white shadow-sm flex flex-col rounded-2xl p-6">
      <div className="px-4">
        <Logo textColor={"text-slate-800"} />
      </div>
      <SidebarItems />
    </div>
  );
};

export default Sidebar;
