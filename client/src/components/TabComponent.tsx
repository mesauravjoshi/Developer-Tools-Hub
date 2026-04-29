import { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MethodsTypes } from '@/types/types'

interface Tab {
  id: number;
  name: string;
  method: MethodsTypes
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const defaultTabs: Tab[] = [
  { id: 1, name: "New Tab", method: 'GET' },
];

export default function TabComponent() {
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState<number>(1);

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now(),
      name: `New Tab ${tabs.length - 1}`,
      method: 'GET',
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();

    // if (tabs.length === 1) return;

    const updatedTabs = tabs.filter((tab) => tab.id !== id);

    setTabs(updatedTabs);

    if (activeTab === id) {
      setActiveTab(updatedTabs[0].id);
    }
  };

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-end px-3 pt-2 gap-1 overflow-x-auto">

        {/* Tabs */}
        <div className="flex flex-1 items-end gap-1 min-w-0">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={classNames(
                  "group relative flex items-center justify-between",
                  "min-w-27.5 max-w-40 flex-1",
                  "px-3 py-2 rounded-t-xl border",
                  "transition-all duration-200",
                  active
                    ? "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 border-b-white dark:border-b-gray-900 text-gray-900 dark:text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {/* slight browser tab curve feel */}
                <span className="truncate text-sm font-medium">
                  {tab.method}
                </span>
                <span className="truncate text-sm font-medium">
                  {tab.name}
                </span>

                { (
                  <button
                    onClick={(e) => closeTab(e, tab.id)}
                    className="ml-3 rounded p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </button>
            );
          })}
        </div>

        {/* Chrome style + button */}
        <button
          onClick={addTab}
          className="mb-0.5 shrink-0 rounded-full p-2 
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition"
        >
          <PlusIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Active tab content demo */}
      {/* <div className="p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h2 className="font-semibold text-lg">
          {
            tabs.find((tab) => tab.id === activeTab)?.name
          }
        </h2>

        <p className="mt-2 text-sm opacity-70">
          Active browser-style tab content goes here.
        </p>
      </div> */}
    </div>
  );
}