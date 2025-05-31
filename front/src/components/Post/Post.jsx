import { useState,useEffect } from 'react'
import axios from 'axios'
import { NavBar } from '../NavBar/Nav'
import Slider from '../Slider'
import { validateURL } from '../Utils/ValidateURL';
import ApiInput from '../UI/ApiInput'
import Request from '../UI/Request/Request'
import Response from '../UI/Response';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Post() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [api, setApi] = useState('');
  const [displayPostData, setDisplayPostData] = useState(null);
  const [body, setBody] = useState('');
  const [header, setHeader] = useState([
    ['Content-Type', 'application/json'],
    ['', ''],
  ]);
  // const [params, setParams] = useState([
  //   ['', ''],
  // ]);
  const [fullParams, setFullParams] = useState('')

  // chatgpt
  const [baseUrl, setBaseUrl] = useState('');
  const [params, setParams] = useState([{ id: Date.now(), key: '', value: '', enabled: true }]);
  const [fullUrl, setFullUrl] = useState('');
  // Update full URL whenever baseUrl or params change
  useEffect(() => {
    const validParams = params
      .filter(param => param.enabled && param.key.trim() !== '')
      .map(param =>
        `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
      );

    const queryString = validParams.length ? `?${validParams.join('&')}` : '';
    setFullUrl(baseUrl + queryString);
  }, [baseUrl, params]);

  const handleBaseUrlChange = (e) => {
    setBaseUrl(e.target.value);
  };

  const handleParamChange = (index, field, value) => {
    const updatedParams = [...params];
    updatedParams[index] = { ...updatedParams[index], [field]: value };
    setParams(updatedParams);
  };

  const addNewParam = () => {
    setParams([
      ...params,
      { id: Date.now(), key: '', value: '', enabled: true }
    ]);
  };

  const deleteParam = (id) => {
    if (params.length <= 1) return;
    setParams(params.filter(param => param.id !== id));
  };

  const toggleParam = (id) => {
    setParams(params.map(param =>
      param.id === id ? { ...param, enabled: !param.enabled } : param
    ));
  };

  // chatgpt


  const handdleChange = (e) => {
    const { name, value } = e.target;
    setApi(value);
  }

  const postTest = async () => {
    // const data = {
    //   title: 'foo',
    //   body: 'bar',
    //   userId: 1,
    // }
    // const headers = {
    //   'Content-Type': 'application/octet-stream',
    //   'Authorization': 'Bearer your_token_here',
    // };
    // console.log('sending body: ', body);
    // console.log('sending headers: ', headers);
    const headers = header;
    try {
      console.log(api);
      const postRequest = await axios.post(`${api}`, body, { headers });
      console.log(postRequest);
      if (typeof postRequest.data === 'object') {
        const toString = JSON.stringify(postRequest.data);
        setDisplayPostData(toString);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // const handleSendReq = (e) => {
  //   setDisplayPostData(null)
  //   const isValid = validateURL(api);
  //   if (isValid) {
  //     postTest();
  //   } else setDisplayPostData('NO RECORD FOUND')
  // }

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
              {/* API Input */}

              <div className="max-w-4xl mx-auto p-6">
                {/* API URL Input */}
                <div className="apiInput flex gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-white 
                      outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 
                      focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      value={fullUrl}
                      onChange={handleBaseUrlChange}
                      placeholder="https://api.example.com/resource"
                    />
                  </div>
                  <button
                    className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white 
                     shadow-xs hover:bg-indigo-500 whitespace-nowrap"
                    onClick={handleSendReq}
                  >
                    Send
                  </button>
                </div>

                {/* Parameters Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white mb-3">Query Parameters</h3>

                  <div className="grid grid-cols-12 gap-2 items-center mb-2">
                    <div className="col-span-1 flex justify-center">
                      <span className="text-sm font-medium text-white">Enabled</span>
                    </div>
                    <div className="col-span-4">
                      <span className="text-sm font-medium text-white">Key</span>
                    </div>
                    <div className="col-span-6">
                      <span className="text-sm font-medium text-white">Value</span>
                    </div>
                    <div className="col-span-1"></div>
                  </div>

                  {params.map((param, index) => (
                    <div key={param.id} className="grid grid-cols-12 gap-2 items-center mb-2">
                      <div className="col-span-1 flex justify-center">
                        <input
                          type="checkbox"
                          checked={param.enabled}
                          onChange={() => toggleParam(param.id)}
                          className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 
                          focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                      </div>

                      <div className="col-span-4">
                        <input
                          type="text"
                          value={param.key}
                          onChange={(e) => handleParamChange(index, 'key', e.target.value)}
                          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white 
                          outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 
                          focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                          placeholder="Key"
                        />
                      </div>

                      <div className="col-span-6">
                        <input
                          type="text"
                          value={param.value}
                          onChange={(e) => handleParamChange(index, 'value', e.target.value)}
                          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white 
                          outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 
                          focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                          placeholder="Value"
                        />
                      </div>

                      <div className="col-span-1 flex justify-center">
                        <button
                          onClick={() => deleteParam(param.id)}
                          disabled={params.length <= 1}
                          className={`rounded-full p-1 ${params.length > 1
                            ? 'text-red-400 hover:bg-white/10 hover:text-red-300'
                            : 'text-gray-500 cursor-not-allowed'
                            }`}
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addNewParam}
                    className="mt-3 flex items-center gap-1 rounded-md bg-white/10 px-3 py-1.5 
                    text-sm font-medium text-white hover:bg-white/20"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Parameter
                  </button>
                </div>

                {/* Current URL Preview */}
                <div className="mt-6 p-4 bg-gray-800/50 rounded-md">
                  <p className="text-sm text-gray-400 mb-1">Current URL:</p>
                  <p className="text-blue-300 font-mono break-all">{fullUrl || <span className="text-gray-500">No URL specified</span>}</p>
                </div>
              </div>


              <Response displayPostData={displayPostData} />

            </div>
          </main>
        </div>
      </div>
    </>
  )
}