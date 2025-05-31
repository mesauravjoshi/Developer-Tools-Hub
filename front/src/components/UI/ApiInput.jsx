

export default function ApiInput({ api, handdleChange, handleSendReq }) {

  return (
    <>
      <div className="apiInput">
        <div className='py-4'>
          <input type="text"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            name='api'
            value={api}
            onChange={(e) => handdleChange(e)}
            placeholder='Test API.........'
          />
        </div>
        <button className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white/20"
          onClick={() => handleSendReq()}>
          Send
        </button>
      </div>
    </>
  )
}
