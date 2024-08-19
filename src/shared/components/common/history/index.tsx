import './style.css';
import {
  ArrowsRightLeftIcon,
  CheckIcon,
  XMarkIcon,
  FunnelIcon,
  CalendarIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

import historyData from './history-data';
import recentHistoryData from './recent-history-data';
type Props = {
  pageTitle?: string;
  width: number;
  pageType?: string;
};
type HistoryDataType = {
  type: string;
  from: string;
  to: string;
  status: string;
  amout: string;
  date: string;
};

const tabClassNames =
  'tab text-base-200 active:text-base-content checked:text-base-content  focus:text-base-content';

const History = (props: Props) => {
  // const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<HistoryDataType[]>(historyData);
  useEffect(() => {
    if (
      props.pageType === 'main' &&
      props.pageTitle === 'Home' &&
      props.width < 1024
    ) {
      setData(recentHistoryData);
    } else {
      setData(historyData);
    }
  }, [props.pageType, props.pageTitle, props.width]);
  return (
    <div className={`h-full`}>
      <div
        className={
          props.pageType === 'main' &&
          props.pageTitle === 'Home' &&
          props.width < 1024
            ? 'hidden'
            : ''
        }
      >
        <div className="w-full overflow-hidden">
          <div
            role="tablist"
            className={`tabs tabs-lifted tabs-lg w-full text-nowrap overflow-auto  `}
          >
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className={tabClassNames}
              aria-label="Transfert"
              defaultChecked
            />

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className={tabClassNames}
              aria-label="Airtime"
            />

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className={tabClassNames}
              aria-label="Transfert International"
            />
          </div>
        </div>
        <div className="flex  py-3 text-base-300 justify-end gap-4">
          <CalendarIcon className="w-6 h-6" />
          <FunnelIcon className="w-6 h-6" />
        </div>
      </div>

      <ul className={`timeline timeline-vertical overflow-y-auto h-full`}>
        {data.map((historyItem, k) => {
          const statusColor =
            historyItem.status === 'Failed' ? 'error' : 'success';
          const iconClassName = `w-6 h-6 text-${statusColor}`;

          return (
            // TODO: Arranger le format des key
            <li key={'history' + k} className="mb-3">
              <div
                className={`timeline-start text-neutral-content badge bg-primary`}
              >
                {' '}
                {historyItem.date}
              </div>
              <div
                className={`timeline-middle hover:border-2 hover:border-${statusColor} rounded-lg p-1 `}
              >
                <div className="text-base-300">
                  <h1>{historyItem.type}</h1>
                  <div
                    className={`grid grid-cols-3 place-items-center text-${statusColor}`}
                  >
                    <h2>{historyItem.from}</h2>
                    <ArrowsRightLeftIcon className="w-5 h-5" />
                    <h2>{historyItem.to}</h2>
                  </div>
                  <span className={`text-${statusColor}`}>
                    {historyItem.amout}
                  </span>
                </div>
              </div>
              <div className="timeline-end">
                {historyItem.status === 'Failed' ? (
                  <XMarkIcon className={iconClassName} />
                ) : (
                  <CheckIcon className={iconClassName} />
                )}
              </div>

              <hr className="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default History;
