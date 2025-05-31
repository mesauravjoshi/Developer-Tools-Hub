import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import BodyWidget from './BodyWidget';
import HeaderWidget from './HeaderWidget';
import ParamsWidget from './ParamsWidget';

const tabs = [
  { name: 'Body', href: '#', current: true },
  { name: 'Header', href: '#', current: false },
  { name: 'Authentication', href: '#', current: false },
  { name: 'Params', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Request({
  body,
  setBody,
  header,
  setHeader,
  params,
  setParams,
  api,
  setApi,
  setFullParams
}) {
  
  const [currentTab, setCurrentTab] = useState('Body');

  const renderTabContent = () => {
    switch (currentTab) {
      case 'Body':
        return <BodyWidget body={body} setBody={setBody} />;
      case 'Header':
        return <HeaderWidget header={header} setHeader={setHeader} />;
      case 'Authentication':
        return <div>Authentication Widget Here</div>;
      case 'Params':
        return <ParamsWidget params={params} setParams={setParams} api={api} setApi={setApi} setFullParams={setFullParams} />
      default:
        return null;
    }
  }

  return (
    <>
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
    </>
  )
}
