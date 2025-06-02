import { useState,useRef  } from 'react'
import axios from 'axios'
import { NavBar } from './NavBar/Nav'
import Slider from './Slider'
import { validateURL } from './Utils/ValidateURL';
import ApiInput from './UI/ApiInput'
import Request from './UI/Request/Request'
import Response from './UI/Response';

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayGetData, setDisplayGetData] = useState(null);

  const [body, setBody] = useState('');
  const [header, setHeader] = useState([
    ['Content-Type', 'application/json'],
    ['', ''],
  ]);

  // chatgpt
  const [params, setParams] = useState([{ id: Date.now(), key: '', value: '', enabled: true }]);
  const [fullUrl, setFullUrl] = useState('');
  const inputRef = useRef(null);

  const fetchAPI = async () => {
    try {
      const getRequest = await axios.put(`${fullUrl}`);
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
    // console.log(typeof fullUrl);
    const isValid = validateURL(fullUrl);
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

          <main className="py-4">
            <div className="px-4 sm:px-6 lg:px-8">

              <h1 className="text-gray-300 text-3xl font-bold">Get </h1>
              {/* API Input */}

              <div className="max-w-4xl mx-auto py-4">

                <ApiInput fullUrl={fullUrl} setFullUrl={setFullUrl} handleSendReq={handleSendReq} inputRef={inputRef} />

                <Request
                  body={body}
                  setBody={setBody}
                  header={header}
                  setHeader={setHeader}
                  params={params}
                  setParams={setParams}
                  fullUrl={fullUrl}
                  setFullUrl={setFullUrl}
                  inputRef={inputRef}
                />

              </div>

              <Response displayPostData={displayGetData} />

            </div>
          </main>
        </div>
      </div>
    </>
  )
}
