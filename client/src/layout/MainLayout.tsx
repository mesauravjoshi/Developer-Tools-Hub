import { useState } from "react";
import { Outlet } from "react-router-dom";
import Slider from "@/layout/Sidebar";
import { NavBar } from "@/layout/Nav";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Slider
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:pl-42">
        <NavBar
          // sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="bg-white dark:bg-gray-900">
          {/* 👇 Page will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}