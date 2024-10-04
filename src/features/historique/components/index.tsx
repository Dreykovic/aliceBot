import './style.css';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect, MutableRefObject } from 'react';

import * as Icon from 'react-bootstrap-icons';

import { setNavStatus } from '@/components/navigations/nav-slice';

import useBoundingClientRect from '@/hooks/use-bounding-client-rect';
import useWindowDimensions from '@/hooks/use-window-dimensions';

import { Order } from '@/types/models-interfaces';
import { AppDispatch } from '@/stores';
import { useDispatch } from 'react-redux';

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

type HistoryDataType = {
  orders: Order[];
  isLoading?: boolean;
};

const History: React.FC<HistoryDataType> = (props: HistoryDataType) => {
  const { height } = useWindowDimensions();
  const [rect, ref] = useBoundingClientRect<HTMLDivElement>();
  const [contentHeight, setContentHeight] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  console.log(props.orders);

  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

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
    <>
      <motion.div
        className="p-2 overflow-y-auto pb-2 "
        initial="hidden"
        animate="visible"
        variants={listVariants}
        // ref={ref}
        style={{ height: `${contentHeight}px` }}
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        {props.orders?.map((historyItem: Order, index: number) => (
          <motion.div key={index} variants={itemVariants}>
            <div
              className={`flex items-center p-3 bg-base-200 rounded-box gap-4 justify-between mb-3 history-badge  relative    ${historyItem.state === 'COMMING' ? 'history-badge-info' : historyItem.state === 'CANCELLED' ? 'history-badge-error' : historyItem.order_type === 'DEPOT' ? 'history-badge-success' : 'history-badge-warning'}`}
            >
              <div className="flex items-center gap-5">
                <div className="avatar placeholder">
                  <div
                    className={`ring-success-content w-12 rounded-full ring ring-offset-2  ${historyItem.state === 'COMMING' ? 'bg-info' : historyItem.state === 'CANCELLED' ? 'bg-error' : historyItem.order_type === 'DEPOT' ? 'bg-success' : 'bg-warning'}`}
                  >
                    <Icon.BuildingFillDown className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Icon.WalletFill />
                    <span>{historyItem.bookmaker_identifiant}</span>
                  </div>
                  <div className="text-[12px]">Payement Reussi</div>
                  <div className="text-[8px] flex items-center gap-2">
                    {historyItem.state === 'COMMING' ? (
                      <div className="bg-info flex justify-center items-center w-4 h-4 rounded-full">
                        <Icon.Clock className="w-2 h-2" />
                      </div>
                    ) : historyItem.state === 'CANCELLED' ? (
                      <div className="bg-error flex justify-center items-center w-4 h-4 rounded-full">
                        <Icon.X className="w-2 h-2" />
                      </div>
                    ) : historyItem.order_type === 'DEPOT' ? (
                      <div className="bg-success flex justify-center items-center w-4 h-4 rounded-full">
                        <Icon.Check className="w-2 h-2" />
                      </div>
                    ) : (
                      <div className="bg-warning flex justify-center items-center w-4 h-4 rounded-full">
                        <Icon.Check className="w-2 h-2" />
                      </div>
                    )}
                    effectué le 22/20/021
                  </div>
                </div>
              </div>
              <div className="btn rounded-full bg-base-300 p-2">
                {historyItem.montant}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default History;
