import { useState,useEffect } from "react"


export default function ApiInput({ fullUrl, handleBaseUrlChange, handleSendReq }) {

  return (
    <>
      <div className="apiInput flex gap-2">
        <div className="flex-grow">
          <input
            type="text"
            className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-white  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            value={fullUrl}
            onChange={handleBaseUrlChange}
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
