import { useState, useRef } from 'react';
import axios from 'axios';
import { validateURL } from '@/Utils/ValidateURL';
import ApiInput from '@/components/UI/ApiInput';
import Request from '@/components/UI/Request/Request';
import Response from '@/components/UI/Response';
import { HeaderItem, ParamItem, MethodsTypes } from '@/types/types';
import SnippetSlide from '@/components/UI/SnippetSlide';

export default function RequestForm() {
  const [method, setMethod] = useState<MethodsTypes>('get');
  const [displayResponse, setDisplayResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState('');
  const [header, setHeader] = useState<HeaderItem[]>([
    { key: 'Content-Type', value: 'application/json', enabled: true },
    { key: '', value: '', enabled: true },
  ]);

  const [params, setParams] = useState<ParamItem[]>([{ id: Date.now(), key: '', value: '', enabled: true }]);
  const [fullUrl, setFullUrl] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [openRightSlider, setOpenRightSlider] = useState(false);
  const [activeLang, setActiveLang] = useState<'curl' | 'fetch' | 'axios'>('curl');

  const buildHeaders = () => {
    const headers: Record<string, string> = {};
    header.forEach(item => {
      if (item.key && item.value && item.enabled !== false) {
        headers[item.key] = item.value;
      }
    });
    return headers;
  };

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const headers = buildHeaders();

      let response;

      if (method === "get" || method === "delete") {
        response = await axios[method](fullUrl, { headers });
      } else {
        response = await axios[method](fullUrl, {}, { headers });
      }

      if (typeof response.data === 'object') {
        const toString = JSON.stringify((response.data), null, 2);
        setDisplayResponse(toString);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setDisplayResponse('Error fetching data');
    }
  }

  const handleSendReq = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisplayResponse(null);
    const isValid = validateURL(fullUrl);
    if (isValid) fetchAPI();
    else setDisplayResponse('NO RECORD FOUND');
  }

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300 relative overflow-hidden">

      <div className="max-w-4xl mx-auto py-4">
        <ApiInput
          fullUrl={fullUrl}
          setFullUrl={setFullUrl}
          handleSendReq={handleSendReq}
          inputRef={inputRef}
          setMethod={setMethod}
          setOpenRightSlider={setOpenRightSlider}
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

        <Response displayResponse={displayResponse} loading={loading} />
      </div>

      <SnippetSlide
        open={openRightSlider}
        onClose={() => setOpenRightSlider(false)}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        method={method}
        fullUrl={fullUrl}
        headers={buildHeaders()}
        body={body}
      />
    </div>
  )
}