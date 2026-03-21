const BodyWidget = ({ body, setBody }) => {
  return (
    <div>
      <textarea
        id="body"
        name="body"
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="block w-full rounded-md bg-gray-950 px-3 py-1.5 text-base text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>
  )
}

export default BodyWidget