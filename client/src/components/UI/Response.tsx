import { useState } from 'react';

interface ResponseProps {
  displayResponse: string | null;
  loading: boolean
}

export default function Response({ displayResponse, loading }: ResponseProps) {
  const [copied, setCopied] = useState(false);
  // const loading = true

  const handleCopy = () => {
    if (!displayResponse) return;
    navigator.clipboard.writeText(displayResponse)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  const handleDownload = (): void => {
    if (!displayResponse) return;

    const blob = new Blob([displayResponse], { type: 'text/plain' });

    const url: string = URL.createObjectURL(blob);

    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = 'response.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-gray-800 dark:text-white mb-2 font-semibold">Response</h2>
        {
          displayResponse &&
          <button
            className="rounded-md bg-green-600 px-3 py-1 mb-2 font-semibold text-white cursor-pointer"
            onClick={handleDownload}
          >
            Save
          </button>
        }
      </div>
      <div className="relative border border-gray-700 rounded-lg overflow-hidden">
        {/* Loading Line */}
        {loading && (
          <div className="absolute top-0 left-0 h-1 w-full">
            <div className="h-full w-0 bg-indigo-500 animate-loading-bar"></div>
          </div>
        )}

        <pre className="bg-gray-800 text-green-300 p-4 min-h-57.5 max-h-57.5 text-sm overflow-auto">
          {displayResponse}
        </pre>

        {/* Copy Button */}
        <div
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-white/10 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-white/20 transition mr-2"
        >
          {copied ? 'Copied!' : 'Copy'}
        </div>
      </div>
    </>
  );
}
