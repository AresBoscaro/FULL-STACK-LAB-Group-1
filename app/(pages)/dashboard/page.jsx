"use client";

import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";

const Dashboard = () => {
  const [tab, setTab] = useState("Dashboard");
  return (
    <div className="p-6 h-full flex items-center space-x-8">
      <Sidebar />
    </div>
  );
};

export default Dashboard;
