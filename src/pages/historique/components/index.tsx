import './style.css';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect, MutableRefObject } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import { setNavStatus } from '@/shared/components/layouts/partials/navigations/nav-slice';
import useBoundingClientRect from '@/shared/hooks/use-bounding-client-rect';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';

import historyData from './history-data';

interface HistoryItem {
  to: string;
  status: string;
  amount: string;
}

const listVariants: Variants = {
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

const itemVariants: Variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const History = () => {
  const { height } = useWindowDimensions();
  const [rect, ref] = useBoundingClientRect<HTMLDivElement>();
  const [contentHeight, setContentHeight] = useState<number>(0);

  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleScroll = () => {
    if (ref.current) {
      const scrollTop = ref.current.scrollTop;
      if (scrollTop > lastScrollTop) {
        dispatch(setNavStatus({ status: 'HIDDEN' }));
      } else if (scrollTop < lastScrollTop) {
        dispatch(setNavStatus({ status: 'VISIBLE' }));
      }
      setLastScrollTop(scrollTop);
    }
  };

  useEffect(() => {
    if (rect) {
      setContentHeight(height - rect.top);
    }
    const scrollDiv = ref.current;
    if (scrollDiv) {
      scrollDiv.addEventListener('scroll', handleScroll);

      return () => {
        scrollDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollTop, height, rect, ref]);

  return (
    <div className="h-full ">
      <div className="flex my-1 p-1 text-base-300 justify-between gap-4 items-center ">
        <Icon.Sliders className="w-6 h-6" />
        <div className="flex justify-between items-center gap-4 my-4">
          <div className="btn rounded-full text-success shadow-lg shadow-success">
            <Icon.BuildingFillDown className="w-6 h-6" />
          </div>
          <div className="btn rounded-full text-warning">
            <Icon.BuildingFillDown className="w-6 h-6" />
          </div>
        </div>
        <Icon.Search className="w-6 h-6" />
      </div>

      <motion.div
        className="p-2 overflow-y-auto pb-2 "
        initial="hidden"
        animate="visible"
        variants={listVariants}
        // ref={ref}
        style={{ height: `${contentHeight}px` }}
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        {historyData.map((historyItem: HistoryItem, index: number) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="flex items-center p-3 bg-base-200 rounded-box gap-4 justify-between mb-3 history-badge history-badge-success relative">
              <div className="flex items-center gap-5">
                <div className="avatar placeholder">
                  <div className="ring-success-content w-12 rounded-full ring ring-offset-2 bg-success">
                    <Icon.BuildingFillDown className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Icon.WalletFill />
                    <span>{historyItem.to}</span>
                  </div>
                  <div className="text-[12px]">Payement Reussi</div>
                  <div className="text-[8px] flex items-center gap-2">
                    <div className="bg-success flex justify-center items-center w-4 h-4 rounded-full">
                      <Icon.Check className="w-2 h-2" />
                    </div>
                    effectué le 22/20/021
                  </div>
                </div>
              </div>
              <div className="btn rounded-full bg-base-300 p-2">
                {historyItem.amount}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default History;
