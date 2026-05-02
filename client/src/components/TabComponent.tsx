import {
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import { MethodsTypes } from '@/types/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/Store'
import { addTab, closeTab, setActiveTab } from '@/store/Slice/tabSlice'
import { Tooltip } from "@/components/Tooltip";
import api from "@/Utils/api";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TabComponent() {
  const dispatch = useDispatch();
  const { tabs, activeTab } = useSelector((state: RootState) => state.tabs);

  const handleAddTab = async () => {
    try {
      const payload = {
        name: `New Tab ${tabs.length}`,
        sidebar: "request",
        method: 'GET'
      }
      const res = await api.post("/tabs", payload);
      dispatch(addTab());
      if (res.data) {
        console.log(res);
      } else {
        console.error("Failed to create tab");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                onClick={() => dispatch(setActiveTab(tab.id))}
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
                <Tooltip content={tab.name}>
                  <span className="truncate text-sm font-medium">
                    {tab.name.slice(0, 9) + (tab.name.length > 9 ? "..." : "")}
                  </span>
                </Tooltip>

                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(closeTab(tab.id))
                  }}
                  className="ml-3 rounded p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <XMarkIcon className="w-4 h-4" />
                </div>

              </button>
            );
          })}
        </div>

        {/* Chrome style + button */}
        <button
          onClick={handleAddTab}
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