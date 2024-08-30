import './style.css';
import { motion } from 'framer-motion';
import * as Icon from 'react-bootstrap-icons';

import historyData from './history-data';
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};
const History = () => {
  return (
    <div className={`h-full  `}>
      <div>
        <div className="flex  my-2 p-1 text-base-300 justify-between gap-4 items-center ">
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

      <motion.div
        className={`timeline timeline-vertical overflow-y-auto h-full  mb-5`}
        initial="hidden"
        animate="visible"
        variants={list}
      >
        {historyData.map((historyItem, k) => {
          // const statusColor =
          //   historyItem.status === 'Failed' ? 'error' : 'success';
          // const iconClassName = `w-6 h-6 text-${statusColor}`;

          return (
            <motion.div variants={item} key={k + 1}>
              <div className="flex items-center p-3 bg-base-200 rounded-box gap-4 justify-between mb-3 history-badge history-badge-success relative">
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
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default History;
