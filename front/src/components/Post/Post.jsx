import { useState, useEffect, useRef } from 'react'
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

  // chatgpt
  const [baseUrl, setBaseUrl] = useState('');
  const [params, setParams] = useState([{ id: Date.now(), key: '', value: '', enabled: true }]);
  const [fullUrl, setFullUrl] = useState('');
  const inputRef = useRef(null);
  const [cursorInfo, setCursorInfo] = useState('');

  // const [firstPart, setFirstPart] = useState('');
  // const [secondPart, setSecondPart] = useState('');

  // Update full URL whenever baseUrl or params change

  useEffect(() => {
    // console.log('calling useEffect ');
    const validParams = params
      .filter(param => param.enabled && param.key.trim() !== '')
      .map(param =>
        `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
      );

    const queryString = validParams.length ? `?${validParams.join('&')}` : '';
    // setFullUrl(baseUrl + queryString);
  }, [baseUrl, params]);

  const handleBaseUrlChange = (e) => {
    const url = e.target.value;
    console.log(url);
    const indexOf_Q = url.indexOf('?')
    console.log(indexOf_Q);

    if (indexOf_Q > 0) {
      const input = inputRef.current;
      const cursorIndex = input.selectionStart;
      console.log(`Cursor is at index: ${cursorIndex}\n`);
      console.log(`? is at index: ${indexOf_Q}\n`);

      const parts = url.split('?');
      const urlArray = [parts[0], '?' + parts[1]];

      const firstPart = urlArray.length > 0 && urlArray[0];
      const secondPart = urlArray.length > 0 && urlArray[1];

      if (cursorIndex > indexOf_Q) {
        // console.log('you are in param ');
        const queryString = secondPart ? secondPart : ''
        setFullUrl(firstPart + queryString)
      }
      if (cursorIndex < indexOf_Q) {
        // console.log('you are in url ')
        const URLString = firstPart ? firstPart : ''
        setFullUrl(URLString + secondPart)
      }
      if (cursorIndex === indexOf_Q) {
        console.log(`Cursor is at ? position: ${cursorIndex}\n`);
        setFullUrl(firstPart + secondPart)
      }

    } else {
      setFullUrl(e.target.value);
    }

  };

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

  // chatgpt

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

              <h1 className="text-gray-300 text-3xl font-bold">Post </h1>
              {/* API Input */}

              <div className="max-w-4xl mx-auto py-4">

                {/* <ApiInput fullUrl={fullUrl} handleBaseUrlChange={handleBaseUrlChange} 
                handleSendReq={handleSendReq} /> */}
                <div className="apiInput flex gap-2">
                  <div className="flex-grow">
                    <input
                      ref={inputRef}
                      type="text"
                      className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-white  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      value={fullUrl}
                      onChange={handleBaseUrlChange}
                      onKeyUp={handleCursorPosition}
                      placeholder="https://api.example.com/resource"
                    />
                  </div>
                  <button
                    className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 whitespace-nowrap"
                    onClick={handleSendReq}
                  >
                    Send
                  </button>
                </div>
                <p className=' text-gray-300 ' onClick={() => setFullUrl('')}> X</p>
                <pre className='text-white'>{cursorInfo}</pre>

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