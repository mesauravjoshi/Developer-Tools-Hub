import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { NavBar } from '../NavBar/Nav'
import Slider from '../Slider'
import { validateURL } from '../Utils/ValidateURL';
import ApiInput from '../UI/ApiInput'
import Request from '../UI/Request/Request'
import Response from '../UI/Response';

export default function Post() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayPostData, setDisplayPostData] = useState(null);
  const [body, setBody] = useState('');
  const [header, setHeader] = useState([
    ['Content-Type', 'application/json'],
    ['', ''],
  ]);

  const [params, setParams] = useState([{ id: Date.now(), key: '', value: '', enabled: true }]);
  const [fullUrl, setFullUrl] = useState('');
  const inputRef = useRef(null);

  // Update full URL whenever baseUrl or params change

  // useEffect(() => {
  //   const validParams = params
  //     .filter(param => param.enabled && param.key.trim() !== '')
  //     .map(param =>
  //       `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
  //     );

  //   const queryString = validParams.length ? `?${validParams.join('&')}` : '';
  // }, [baseUrl, params]);

  const handleCursorPosition = (e) => {
    // const url = e.target.value;
    // const indexOf_Q = url.indexOf('?')

    // const input = inputRef.current;
    // const cursorIndex = input.selectionStart;
    // const text = input.value;
    // console.log(`Cursor is at index: ${cursorIndex}\n`);
    // let info = `Cursor is at index: ${cursorIndex}\n`;
    // console.log(`? is at index: ${indexOf_Q}\n`);

    // if (cursorIndex > indexOf_Q) {
    //   console.log('you are in param ');
    // }
    // if (cursorIndex < indexOf_Q) {
    //   console.log('you are in url ')
    // }

    // if (cursorIndex > 0 && cursorIndex < text.length) {
    //   info += `Between "${text[cursorIndex - 1]}" and "${text[cursorIndex]}"`;
    // } else if (cursorIndex === 0) {
    //   info += 'At the very beginning.';
    // } else if (cursorIndex === text.length) {
    //   info += 'At the very end.';
    // }

    // setCursorInfo(info);
  };

  const postTest = async () => {

    const headers = header;
    try {
      console.log(JSON.parse(body));
      const postRequest = await axios.post(`${fullUrl}`, JSON.parse(body), { headers });
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
    const isValid = validateURL(fullUrl);
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

              <h1 className="text-gray-300 text-3xl font-bold">Post </h1>
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

              <Response displayPostData={displayPostData} />

            </div>
          </main>
        </div>
      </div>
    </>
  )
}