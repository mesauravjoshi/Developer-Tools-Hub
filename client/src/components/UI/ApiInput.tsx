// ApiInput.tsx
import { useState, useEffect, RefObject } from "react"

interface ApiInputProps {
  fullUrl: string;
  setFullUrl: (url: string) => void;
  handleSendReq: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function ApiInput({ fullUrl, setFullUrl, handleSendReq, inputRef }: ApiInputProps) {

  const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const indexOf_Q = url.indexOf('?')

    if (indexOf_Q > 0) {
      const input = inputRef.current;
      const cursorIndex = input?.selectionStart || 0;
      
      const parts = url.split('?');
      const urlArray = [parts[0], '?' + parts[1]];

      const firstPart = urlArray.length > 0 ? urlArray[0] : '';
      const secondPart = urlArray.length > 0 ? urlArray[1] : '';

      if (cursorIndex > indexOf_Q) {
        const queryString = secondPart ? secondPart : ''
        setFullUrl(firstPart + queryString)
      }
      if (cursorIndex < indexOf_Q) {
        const URLString = firstPart ? firstPart : ''
        setFullUrl(URLString + secondPart)
      }
      if (cursorIndex === indexOf_Q) {
        setFullUrl(firstPart + secondPart)
      }
    } else {
      setFullUrl(url);
    }
  };

  return (
    <div className="apiInput flex gap-2">
      <button
        className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 whitespace-nowrap transition-colors"
      >
        GET
      </button>
      <div className="grow">
        <input
          ref={inputRef}
          type="text"
          className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 dark:focus:outline-indigo-400 sm:text-sm/6 transition-colors"
          value={fullUrl}
          onChange={handleBaseUrlChange}
          placeholder="https://api.example.com/resource"
        />
      </div>
      <button
        className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 whitespace-nowrap transition-colors"
        onClick={handleSendReq}
      >
        Send
      </button>
    </div>
  )
}