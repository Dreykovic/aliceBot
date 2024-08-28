import './style.css';
import * as Icon from 'react-bootstrap-icons';

import historyData from './history-data';

const History = () => {
  return (
    <div className={`h-full  `}>
      <div>
        <div className="flex  my-5 p-3 text-base-300 justify-between gap-4 items-center">
          <Icon.Sliders className="w-6 h-6" />
          <div className="flex justify-between items-center gap-4 my-4">
            <div className="btn rounded-full text-success shadow-lg shadow-success ">
              <Icon.BuildingFillDown className="w-6 h-6" />
            </div>
            <div className="btn rounded-full text-warning">
              <Icon.BuildingFillDown className="w-6 h-6" />
            </div>
          </div>

          <Icon.Search className="w-6 h-6" />
        </div>
      </div>

      <ul className={`timeline timeline-vertical overflow-y-auto h-full  mb-5`}>
        {historyData.map((historyItem, k) => {
          // const statusColor =
          //   historyItem.status === 'Failed' ? 'error' : 'success';
          // const iconClassName = `w-6 h-6 text-${statusColor}`;

          return (
            // TODO: Arranger le format des key
            <div
              className="flex items-center p-3 bg-base-200 rounded-box gap-4 justify-between mb-3"
              key={k + 1}
            >
              <div className="flex items-center gap-5">
                <div className="avatar placeholder  ">
                  <div className="ring-success-content w-12 rounded-full ring ring-offset-2 bg-success">
                    <Icon.BuildingFillDown className="w-6 h-6" />
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center gap-1">
                    <span>
                      <Icon.WalletFill />
                    </span>
                    <span>{historyItem.to}</span>
                  </div>
                  <div className="text-[12px]">Payement Reussi</div>
                  <div className="text-[8px] flex items-center gap-2 ">
                    <div className="bg-success items-center flex justify-center w-4 h-4 rounded-full ">
                      <Icon.Check className="w-2 h-2" />
                    </div>
                    effectué le 22/20/021
                  </div>
                </div>
              </div>
              <div className="btn  rounded-full bg-base-300 p-2">
                100 000 FCFA
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default History;
