import { useState } from 'react'
import axios from 'axios'
import { NavBar } from './NavBar/Nav'
import Slider from './Slider'
import { validateURL } from './Utils/ValidateURL';

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [api, setApi] = useState('');
  const [displayGetData, setDisplayGetData] = useState(null);

  const handdleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setApi(value);
  }

  const fetchAPI = async () => {
    try {
      const getRequest = await axios.get(`${api}`);
      console.log('Data:', getRequest);
      console.log('Data type:', typeof getRequest.data === 'string');
      if (typeof getRequest.data === 'object') {
        const toString = JSON.stringify(getRequest.data);
        setDisplayGetData(toString);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSendReq = (e) => {
    setDisplayGetData(null)
    // console.log(typeof api);
    const isValid = validateURL(api);
    if (isValid) fetchAPI();
    else setDisplayGetData('NO RECORD FOUND')
  }

  return (
    <>
      <div>
        {/* Slider code */}
        <Slider sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} r />

        <div className="lg:pl-72">
          <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">

              <h1 className="text-gray-300 text-3xl font-bold">Get </h1>
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

              <h2 className='text-gray-300'>Content type: content-type</h2>

              <div className="mt-7">
                <textarea
                  disabled={true}
                  id="comment"
                  name="comment"
                  rows={10}
                  value={displayGetData ? displayGetData : ''}
                  className="block w-full rounded-md bg-gray-950 px-3 py-1.5 text-base text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  )
}
