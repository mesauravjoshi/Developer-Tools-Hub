import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div
            className="
      h-screen
      flex
      flex-col
      bg-gray-50
      dark:bg-[#121212]
      text-black
      dark:text-white
      transition
    "
        >
            <Navbar />

            <div className="flex flex-1">

                <Sidebar />

                <div className="flex-1 overflow-auto">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Layout;