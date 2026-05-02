import { useEffect, useMemo, useState } from "react";
import api from "@/Utils/api";
import { formatDate } from "@/libs/formatDate";
import {
  ClockIcon
} from "@heroicons/react/24/outline";
import { ApiHistory } from '@/types/types'
import AccordionSection from '@/components/History/AccordionSection'
import RequestForm from '@/components/Request/RequestForm'
// import { RootState } from "@/store/Store";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

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

export default function HistoryComponent() {
  const [history, setHistory] = useState<ApiHistory[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<ApiHistory | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // const [loadingReqForm, setLoadingReqForm] = useState(false);
  // const { tabs } = useSelector((state: RootState) => state.tabs);
  // console.log(tabs);

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

  // useEffect(() => {
  //   console.log('tabs');
  //   setLoadingReqForm(true);
  // }, [tabs]);

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

  const handleRemoveHistory = async (id: string) => {
    try {
      const res = await api.delete(`/history/${id}`);

      console.log(res.data.message); // "History deleted successfully"

      // Remove deleted item from UI
      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );

    } catch (error: any) {
      console.error(
        "Delete failed:",
        error?.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* LEFT PANEL */}
      <aside className="w-[30%] h-screen border-r border-gray-200 dark:border-gray-800">
        <div className="h-full overflow-y-auto p-3">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search endpoint or method..."
            className="text-sm w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 mb-3"
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
                  onDelete={handleRemoveHistory}
                  setSelectedHistory={setSelectedHistory}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main className="w-[68%] h-screen overflow-y-auto">
        {
          selectedHistory ?
            <RequestForm defaultData={selectedHistory} /> :
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold mb-2">
                Request History
              </h1>

              <p className="opacity-70 mb-8">
                View grouped API request logs by date,
                inspect status codes and endpoint activity.
              </p>

            </div>
        }
      </main>
    </div>
  );
}