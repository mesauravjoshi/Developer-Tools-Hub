import { useEffect, useMemo, useState } from "react";
import api from "@/Utils/api";
import { formatDate } from "@/libs/formatDate";

import {
  ChevronDownIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

/* -------------------- Types -------------------- */

interface ApiHistory {
  _id: string;
  userId: string;
  apiUrl: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  statusCode: number;
  responseTime: number;
  isError: boolean;
  testedAt: string;
}

/* -------------------- Utils -------------------- */

function getRelativeLabel(dateString: string) {
  const d = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(d, today)) return "Today";
  if (sameDay(d, yesterday)) return "Yesterday";

  return formatDate(dateString); // 12 Jun 2026
}

function groupByDate(items: ApiHistory[]) {
  return items.reduce((acc: Record<string, ApiHistory[]>, item) => {
    const dateKey = new Date(item.testedAt).toDateString();

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(item);
    return acc;
  }, {});
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function methodBadge(method: string) {
  const map: Record<string, string> = {
    GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    PUT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    PATCH: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  return map[method] || "bg-gray-100";
}

/* -------------------- Reusable Components -------------------- */

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <ClockIcon className="mx-auto h-14 w-14 opacity-40" />
      <p className="mt-4 text-sm opacity-70">
        No API history found
      </p>
    </div>
  );
}

function HistoryItem({ item }: { item: ApiHistory }) {
  return (
    <div className="group rounded-xl border border-gray-200 dark:border-gray-800 
      p-2 transition hover:shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50">

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`px-2.5 py-1 rounded-full text-sm font-semibold ${methodBadge(
                item.method
              )}`}
            >
              {item.method}
            </span>

            <span
              className={`flex items-center gap-1 text-sm font-medium ${item.statusCode < 400
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500"
                }`}
            >
              {item.statusCode < 400 ? (
                <CheckCircleIcon className="w-4 h-4" />
              ) : (
                <ExclamationCircleIcon className="w-4 h-4" />
              )}
              {item.statusCode}
            </span>

            <span className="text-sm opacity-60">
              {item.responseTime}ms
            </span>
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <LinkIcon className="w-4 h-4 opacity-50 shrink-0" />
            <p className="truncate text-sm font-medium">
              {item.apiUrl}
            </p>
          </div>
        </div>

        <div className="text-sm opacity-60 shrink-0">
          {formatTime(item.testedAt)}
        </div>
      </div>
    </div>
  );
}

function AccordionSection({
  title,
  items,
  defaultOpen = true,
}: {
  title: string;
  items: ApiHistory[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold">{title}</span>

          <span className="text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
            {items.length}
          </span>
        </div>

        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${open ? "max-h-300" : "max-h-0"
          }`}
      >
        <div className="p-4 pt-0 space-y-3">
          {items.map((item) => (
            <HistoryItem
              key={item._id}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Main -------------------- */

export default function RequestForm() {
  const [history, setHistory] = useState<ApiHistory[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get("/history");

        setHistory(res.data.data);
      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return history;

    return history.filter(
      (item) =>
        item.apiUrl.toLowerCase().includes(search.toLowerCase()) ||
        item.method.toLowerCase().includes(search.toLowerCase())
    );
  }, [history, search]);

  const grouped = useMemo(() => {
    return groupByDate(filtered);
  }, [filtered]);

  const groupedEntries = Object.entries(grouped).sort(
    (a, b) =>
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
  );

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* LEFT PANEL */}
      <aside className="w-[30%] h-screen border-r border-gray-200 dark:border-gray-800">
        <div className="h-full overflow-y-auto p-3">

          <h2 className="font-semibold text-lg mb-4">
            API History
          </h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search endpoint or method..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900 px-4 py-3 outline-none
            focus:ring-2 focus:ring-blue-500 mb-5"
          />

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl animate-pulse bg-gray-100 dark:bg-gray-800"
                />
              ))}
            </div>
          ) : groupedEntries.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {groupedEntries.map(([date, items]) => (
                <AccordionSection
                  key={date}
                  title={getRelativeLabel(date)}
                  items={items}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main className="w-[68%] h-screen overflow-y-auto p-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold mb-2">
            Request History
          </h1>

          <p className="opacity-70 mb-8">
            View grouped API request logs by date,
            inspect status codes and endpoint activity.
          </p>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <p className="opacity-70">
              Select a request from the history panel to show
              request/response details here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}