import { useState, useEffect } from "react"

export default function ApiInput({ fullUrl, setFullUrl, handleSendReq, inputRef }) {

  const handleBaseUrlChange = (e) => {
    const url = e.target.value;
    const indexOf_Q = url.indexOf('?')

    if (indexOf_Q > 0) {
      const input = inputRef.current;
      const cursorIndex = input.selectionStart;
      // console.log(`Cursor is at index: ${cursorIndex}\n`);
      // console.log(`? is at index: ${indexOf_Q}\n`);

      const parts = url.split('?');
      const urlArray = [parts[0], '?' + parts[1]];

      const firstPart = urlArray.length > 0 && urlArray[0];
      const secondPart = urlArray.length > 0 && urlArray[1];

      if (cursorIndex > indexOf_Q) {
        // console.log('you are in param ');
        const queryString = secondPart ? secondPart : ''
        setFullUrl(firstPart + queryString)
      }
      if (cursorIndex < indexOf_Q) {
        // console.log('you are in url ')
        const URLString = firstPart ? firstPart : ''
        setFullUrl(URLString + secondPart)
      }
      if (cursorIndex === indexOf_Q) {
        // console.log(`Cursor is at ? position: ${cursorIndex}\n`);
        setFullUrl(firstPart + secondPart)
      }
    } else {
      setFullUrl(url);
    }
  };

  return (
    <>
      <div className="apiInput flex gap-2">
        <div className="flex-grow">
          <input
            ref={inputRef}
            type="text"
            className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-white  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            value={fullUrl}
            onChange={handleBaseUrlChange}
            // onKeyUp={handleCursorPosition}
            placeholder="https://api.example.com/resource"
          />
        </div>
        <button
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 whitespace-nowrap"
          onClick={handleSendReq}
        >
          Send
        </button>
      </div>
    </>
  )
}
