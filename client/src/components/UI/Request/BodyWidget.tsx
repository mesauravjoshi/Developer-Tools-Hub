// BodyWidget.tsx
interface BodyWidgetProps {
  body: string;
  setBody: (body: string) => void;
}

export default function BodyWidget({ body, setBody }: BodyWidgetProps) {
  return (
    <div>
      <textarea
        rows={4}
        className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 font-mono transition-colors"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='{
  "key": "value"
}'
      />
    </div>
  )
}