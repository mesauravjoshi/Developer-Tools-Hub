import { useState } from 'react';

export default function Response({ displayPostData, loading }) {
  const [copied, setCopied] = useState(false);
  // const loading = true
  console.log(loading);

  const handleCopy = () => {
    if (!displayPostData) return;
    navigator.clipboard.writeText(displayPostData)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <>
      <h2 className="text-white mb-2">Response</h2>
      <div className="relative border border-gray-700 rounded-lg overflow-hidden">
        {/* Loading Line */}
        {loading && (
          <div className="absolute top-0 left-0 h-1 w-full">
            <div className="h-full w-0 bg-indigo-500 animate-loading-bar"></div>
          </div>
        )}

        <pre className="bg-gray-800 text-green-300 p-4 min-h-[230px] max-h-[230px] text-sm overflow-auto">
          {displayPostData}
        </pre>

        {/* Copy Button */}
        <div
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-white/10 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-white/20 transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </div>
      </div>
    </>
  );
}
