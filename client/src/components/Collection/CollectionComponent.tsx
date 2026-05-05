import { useEffect, useMemo, useState } from "react";
import api from "@/Utils/api";
import { ClockIcon, LinkIcon, TrashIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/Store";
import { addTabFromHistory } from "@/store/Slice/tabSlice";
import Tooltip from "@/components/Tooltip";
import { MethodsTypes } from "@/types/types";

interface CollectionItem {
  _id: string;
  userId: string;
  name: string;
  apiUrl: string;
  method: MethodsTypes;
  createdAt?: string;
  updatedAt?: string;
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

function CollectionItemUI({ item, onDelete }: { item: CollectionItem; onDelete: (id: string) => void }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(addTabFromHistory({
      _id: item._id,
      userId: item.userId,
      apiUrl: item.apiUrl,
      method: item.method as any,
      statusCode: 200,
      responseTime: 0,
      isError: false,
      testedAt: new Date().toISOString()
    }));
  };

  return (
    <div 
      className="group rounded-xl border border-gray-200 dark:border-gray-800 p-2 transition hover:shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1 mb-1">
            <span className={`px-2.5 py-1 rounded-full text-sm font-semibold ${methodBadge(item.method)}`}>
              {item.method}
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <LinkIcon className="w-4 h-4 opacity-50 shrink-0" />
            <Tooltip content={item.apiUrl}>
              <p className="truncate text-sm font-medium">
                {item.apiUrl}
              </p>
            </Tooltip>
          </div>
        </div>
        <div className="text-sm opacity-60 shrink-0 flex items-center gap-2 min-w-0">
          <TrashIcon 
            className="w-4 h-4 cursor-pointer hover:text-red-500 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item._id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function CollectionAccordionSection({
  title,
  items,
  onDelete,
  defaultOpen = true,
}: {
  title: string;
  items: CollectionItem[];
  onDelete: (id: string) => void;
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
          {/* <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
            {items.length}
          </span> */}
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${open ? "max-h-96 overflow-y-auto" : "max-h-0"}`}>
        <div className="p-4 pt-0 space-y-3">
          {items.map((item) => (
            <CollectionItemUI key={item._id} item={item} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <ClockIcon className="mx-auto h-14 w-14 opacity-40" />
      <p className="mt-4 opacity-70">
        No Collections found
      </p>
    </div>
  );
}

export default function CollectionComponent() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/collection");
        setCollections(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return collections;
    return collections.filter(
      (item) =>
        item.apiUrl.toLowerCase().includes(search.toLowerCase()) ||
        item.method.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [collections, search]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc: Record<string, CollectionItem[]>, item) => {
      const collectionName = item.name || "Untitled Collection";
      if (!acc[collectionName]) {
        acc[collectionName] = [];
      }
      acc[collectionName].push(item);
      return acc;
    }, {});
  }, [filtered]);

  const groupedEntries = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));

  const handleRemoveCollection = async (id: string) => {
    try {
      await api.delete(`/collection/${id}`);
      setCollections((prev) => prev.filter((item) => item._id !== id));
    } catch (error: any) {
      console.error("Delete failed:", error?.response?.data?.message || error.message);
    }
  };

  return (
    <aside className="w-[30%] h-screen border-r text-sm border-gray-200 dark:border-gray-800">
      <div className="h-full overflow-y-auto p-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search collections..."
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 mb-3"
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
            {groupedEntries.map(([name, items]) => (
              <CollectionAccordionSection
                key={name}
                title={name}
                items={items}
                onDelete={handleRemoveCollection}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}