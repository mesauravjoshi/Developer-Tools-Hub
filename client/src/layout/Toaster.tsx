import { Toaster } from "react-hot-toast";

export default function Index() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "!bg-white dark:!bg-gray-900 !text-gray-900 dark:!text-gray-100 !border !border-gray-200 dark:!border-gray-700",
        }}
      />
    </>
  );
}