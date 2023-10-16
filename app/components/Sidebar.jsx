import { usePathname } from "next/navigation";
import Logo from "./Logo";
import SidebarItems from "./SidebarItems";
import { HelpCircle, LayoutGrid, User2 } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const iconStyle = {
    cn: "text-slate-600",
    sz: 18,
  };

  const studItems = [
    {
      label: "Dashboard",
      icon: <LayoutGrid className={iconStyle.cn} size={iconStyle.sz} />,
    },
    {
      label: "Profile",
      icon: <User2 className={iconStyle.cn} size={iconStyle.sz} />,
    },
    {
      label: "Help",
      icon: <HelpCircle className={iconStyle.cn} size={iconStyle.sz} />,
    },
  ];

  const adminItems = [
    {
      label: "Dashboard",
      icon: <LayoutGrid className={iconStyle.cn} size={iconStyle.sz} />,
    },
  ];

  return (
    <div className="h-full w-72 bg-white shadow-sm flex flex-col rounded-2xl p-6">
      <div className="px-4">
        <Logo textColor={"text-slate-800"} />
      </div>
      <SidebarItems items={pathname == "/dashboard" ? studItems : adminItems} />
    </div>
  );
};

export default Sidebar;
