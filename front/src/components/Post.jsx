import { useState } from 'react'
import axios from 'axios'
import { NavBar } from './NavBar/Nav'
import Slider from './Slider'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { validateURL } from './Utils/ValidateURL';

const tabs = [
  { name: 'Body', href: '#', current: true },
  { name: 'Header', href: '#', current: false },
  { name: 'Authentication', href: '#', current: false },
  { name: 'Params', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Post() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [api, setApi] = useState('');
  const [displayPostData, setDisplayPostData] = useState(null);
  const [body, setBody] = useState('');
  const [header, setHeader] = useState({});
  const [currentTab, setCurrentTab] = useState('Body');

  const handdleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setApi(value);
  }

  const postTest = async () => {
    // const data = 
    // {
    //   title: 'foo',
    //   body: 'bar',
    //   userId: 1,
    // }
    const headers = {
      'Content-Type': 'application/octet-stream',
      'Authorization': 'Bearer your_token_here',
    };
    try {
      console.log(api);
      const postRequest = await axios.post(`${api}`, body, { headers });
      console.log(postRequest.data);
      if (typeof postRequest.data === 'object') {
        const toString = JSON.stringify(postRequest.data);
        setDisplayPostData(toString);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const handleSendReq = (e) => {
    setDisplayPostData(null)
    // console.log(typeof api);
    const isValid = validateURL(api);
    if (isValid) {
      postTest();
      // if (body === '' || header === '') {
      //   postTest();
      // } else postTest(); // create function when body is empty
    } else setDisplayPostData('NO RECORD FOUND')
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 'Body':
        return <BodyWidget body={body} setBody={setBody} />;
      case 'Header':
        return <HeaderWidget header={header} setHeader={setHeader} />;
      case 'Authentication':
        return <div>Authentication Widget Here</div>;
      case 'Params':
        return <div>Params Widget Here</div>;
      default:
        return null;
    }
  }

  return (
    <>
      <div>
        {/* Slider code */}
        <Slider sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} r />

        <div className="lg:pl-72">
          <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="py-4">
            <div className="px-4 sm:px-6 lg:px-8">

              <h1 className="text-gray-300 text-3xl font-bold">Post </h1>
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

              <div>
                <div className="grid grid-cols-1 sm:hidden">
                  {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                  <select
                    defaultValue={tabs.find((tab) => tab.current).name}
                    aria-label="Select a tab"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                      {tabs.map((tab, index) => (
                        <div key={index}
                          onClick={() => setCurrentTab(tab.name)}
                          className={classNames(
                            currentTab === tab.name
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap cursor-default',
                          )}
                        >
                          {tab.name}
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Render the correct tab content */}
              {renderTabContent()}

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

            </div>
          </main>
        </div>
      </div>
    </>
  )
}

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

const HeaderWidget = ({ header, setHeader }) => {
  return (
    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">
          Key
        </label>
        <div className="mt-2">
          <input
            id="first-name"
            name="first-name"
            type="text"
            autoComplete="given-name"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
        </div>
        <div className="mt-2">
          <input
            id="first-name"
            name="first-name"
            type="text"
            autoComplete="given-name"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="last-name" className="block text-sm/6 font-medium text-white">
          Key
        </label>
        <div className="mt-2">
          <input
            id="last-name"
            name="last-name"
            type="text"
            autoComplete="family-name"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
        </div>
        <div className="mt-2">
          <input
            id="last-name"
            name="last-name"
            type="text"
            autoComplete="family-name"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  )
}
