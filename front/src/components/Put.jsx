import { useState } from 'react'
import axios from 'axios'
import { NavBar } from './NavBar/Nav'
import Slider from './Slider'
import { validateURL } from './Utils/ValidateURL';
import ApiInput from './UI/ApiInput'
import Request from './UI/Request/Request'
import Response from './UI/Response';

export default function Put() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [api, setApi] = useState('');
  const [displayPostData, setDisplayPostData] = useState(null);
  const [body, setBody] = useState('');
  const [header, setHeader] = useState([
    ['Content-Type', 'application/json'],
    ['', ''],
  ]);
  const [params, setParams] = useState([
    ['', ''],
  ]);
  const [fullParams, setFullParams] = useState('');

  const handdleChange = (e) => {
    const { name, value } = e.target;
    setApi(value);
  }

  const postTest = async () => {
    const headers = header;
    try {
      console.log(api);
      const postRequest = await axios.put(`${api}`, body, { headers });
      console.log(postRequest);
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
    const isValid = validateURL(api);
    if (isValid) {
      postTest();
    } else setDisplayPostData('NO RECORD FOUND')
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

              <h1 className="text-gray-300 text-3xl font-bold">Put </h1>

              <ApiInput api={api} handdleChange={handdleChange} handleSendReq={handleSendReq} />

              <Request
                body={body}
                setBody={setBody}
                header={header}
                setHeader={setHeader}
                params={params}
                setParams={setParams}
                api={api}
                setApi={setApi}
                setFullParams={setFullParams}
              />

              <Response displayPostData={displayPostData}/>

            </div>
          </main>
        </div>
      </div>
    </>
  )
}
