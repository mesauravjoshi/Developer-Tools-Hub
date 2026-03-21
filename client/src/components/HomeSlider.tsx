import { useState } from "react";

const menu: string[] = [
  "Home",
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "Settings",
];

const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>("Home");

  return (
    <div
      className="
      w-52
      h-full
      border-r
      border-gray-300
      dark:border-gray-700
      bg-gray-100
      dark:bg-[#1e1e1e]
      p-3
      transition
    "
    >
      {menu.map((item) => (
        <div
          key={item}
          onClick={() => setActive(item)}
          className={`
            px-3
            py-2
            rounded-lg
            cursor-pointer
            mb-1
            transition
            ${
              active === item
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;