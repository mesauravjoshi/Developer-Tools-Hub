import { useState, useRef } from 'react'
import axios from 'axios'
import { validateURL } from '@/Utils/ValidateURL';
import ApiInput from '@/components/UI/ApiInput'
import Request from '@/components/UI/Request/Request'
import Response from '@/components/UI/Response';

export default function Index() {
  const [displayGetData, setDisplayGetData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [body, setBody] = useState('');
  const [header, setHeader] = useState([
    ['Content-Type', 'application/json'],
    ['', ''],
  ]);

  const [params, setParams] = useState([{ id: Date.now(), key: '', value: '', enabled: true }]);
  const [fullUrl, setFullUrl] = useState('');
  const inputRef = useRef(null);

  const fetchAPI = async () => {
    const headers = header;
    try {
      setLoading(true)
      const getRequest = await axios.get(`${fullUrl}`, body, { headers });
      console.log('Data:', getRequest);
      console.log('Data type:', typeof getRequest.data === 'string');
      if (typeof getRequest.data === 'object') {
        const toString = JSON.stringify((getRequest.data), null, 2);
        setDisplayGetData(toString);
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const handleSendReq = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisplayGetData(null);
    const isValid = validateURL(fullUrl);
    if (isValid) fetchAPI();
    else setDisplayGetData('NO RECORD FOUND');
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold">Get</h1>

      <div className="max-w-4xl mx-auto py-4">
        <ApiInput
          fullUrl={fullUrl}
          setFullUrl={setFullUrl}
          handleSendReq={handleSendReq}
          inputRef={inputRef}
        />

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
        
        <Response displayPostData={displayGetData} loading={loading} />
      </div>

    </div>
  )
}
