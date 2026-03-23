import { useState, useRef } from 'react'
import axios from 'axios'
import { validateURL } from '@/Utils/ValidateURL';
import ApiInput from '@/components/UI/ApiInput'
import Request from '@/components/UI/Request/Request'
import Response from '@/components/UI/Response';
import { HeaderItem, ParamItem, MethodsTypes } from '@/types/types';

export default function Index() {
  const [method, setMethod] = useState<MethodsTypes>('get');
  const [displayGetData, setDisplayGetData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState('');
  const [header, setHeader] = useState<HeaderItem[]>([
    { key: 'Content-Type', value: 'application/json', enabled: true },
    { key: '', value: '', enabled: true },
  ]);

  const [params, setParams] = useState<ParamItem[]>([{ id: Date.now(), key: '', value: '', enabled: true }]);
  const [fullUrl, setFullUrl] = useState('');
  const inputRef = useRef(null);

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const headers: Record<string, string> = {};
      header.forEach(item => {
        if (item.key && item.value && item.enabled !== false) {
          headers[item.key] = item.value;
        }
      });

      let response: any;

      if (method === "get" || method === "delete") {
        response = await axios[method](fullUrl, { headers });
      } else {
        response = await axios[method](fullUrl, {}, { headers });
      }

      console.log('Data:', response);
      console.log('Data type:', typeof response.data === 'string');
      if (typeof response.data === 'object') {
        const toString = JSON.stringify((response.data), null, 2);
        setDisplayGetData(toString);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setDisplayGetData('Error fetching data');
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
      {/* <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold">Get</h1> */}

      <div className="max-w-4xl mx-auto py-4">
        <ApiInput
          fullUrl={fullUrl}
          setFullUrl={setFullUrl}
          handleSendReq={handleSendReq}
          inputRef={inputRef}
          setMethod={setMethod}
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
