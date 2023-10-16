import { LogOut } from "lucide-react";

const SidebarItems = ({ items, onSelect }) => {
  return (
    <div className="mt-10 flex flex-col h-full justify-between">
      <div className="space-y-2">
        {items.map((item, id) => (
          <div
            key={id}
            className="flex items-center space-x-4 cursor-pointer transition-all p-4 hover:translate-x-2"
            onClick={onSelect}
          >
            {item.icon}
            <h3 className="text-slate-600 text-sm font-light">{item.label}</h3>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold text-slate-800">User</h1>
        <LogOut className="text-slate-800 cursor-pointer" size={20} />
      </div>
    </div>
  );
};

export default SidebarItems;
