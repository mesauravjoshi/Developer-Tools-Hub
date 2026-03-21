import { PlusIcon } from '@heroicons/react/20/solid'


const HeaderWidget = ({ header, setHeader }) => {
  const handleChangeKey = (e, index) => {
    const updatedKey = e.target.value;
    const updatedHeader = [...header];
    updatedHeader[index][0] = updatedKey;
    setHeader(updatedHeader);
  };

  const handleChangeValue = (e, index) => {
    const updatedValue = e.target.value;
    const updatedHeader = [...header];
    updatedHeader[index][1] = updatedValue;
    setHeader(updatedHeader);
  };

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">
            Key
          </label>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm/6 font-medium text-white">
            Value
          </label>
        </div>
      </div>

      {
        header.map(([key, value], index) => (
          <div key={index} className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={key}
                  onChange={(e) => handleChangeKey(e, index)}
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  value={value}
                  onChange={(e) => handleChangeValue(e, index)}
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        ))
      }
      <button
        onClick={() => {
          setHeader([
            ...header,
            ['', '']
          ])
        }}
        type="button"
        className="rounded-full bg-indigo-600 p-1.5 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusIcon aria-hidden="true" className="size-5" />
      </button>
    </>
  )
}

export default HeaderWidget