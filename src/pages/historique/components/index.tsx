import './style.css';
import * as Icon from 'react-bootstrap-icons';

import historyData from './history-data';

const tabClassNames =
  'tab text-base-200 active:text-base-content checked:text-base-content  focus:text-base-content';

const History = () => {
  return (
    <div className={`h-full bg-red-900`}>
      <div>
        <div className="flex  py-3 text-base-300 justify-end gap-4">
          <Icon.Calendar className="w-6 h-6" />
          <Icon.Funnel className="w-6 h-6" />
        </div>
      </div>

      <ul className={`timeline timeline-vertical overflow-y-auto h-full`}>
        {historyData.map((historyItem, k) => {
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
                    <Icon.ArrowLeftRight className="w-5 h-5" />
                    <h2>{historyItem.to}</h2>
                  </div>
                  <span className={`text-${statusColor}`}>
                    {historyItem.amout}
                  </span>
                </div>
              </div>
              <div className="timeline-end">
                {historyItem.status === 'Failed' ? (
                  <Icon.X className={iconClassName} />
                ) : (
                  <Icon.Check className={iconClassName} />
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
