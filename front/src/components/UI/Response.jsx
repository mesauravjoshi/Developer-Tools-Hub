
export default function Response({displayPostData}) {
  return (
    <>
      <div className="text-gray-300 mt-7">
        Response
        <textarea
          disabled={true}
          id="comment"
          name="comment"
          rows={10}
          value={displayPostData ? displayPostData : ''}
          className="block w-full rounded-md bg-gray-950 px-3 py-1.5 text-base text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>

    </>
  )
}
