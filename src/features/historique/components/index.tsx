import './style.css';
import { motion, Variants } from 'framer-motion';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import { setNavStatus } from '@/components/navigations/nav-slice';
import useBoundingClientRect from '@/hooks/use-bounding-client-rect';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';
import { Order } from '@/types/models-interfaces';

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

const History: React.FC<HistoryDataType> = React.memo(
  ({ orders }: HistoryDataType) => {
    const { height } = useWindowDimensions();
    const [rect, ref] = useBoundingClientRect<HTMLDivElement>();
    const [contentHeight, setContentHeight] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const [lastScrollTop, setLastScrollTop] = useState<number>(0);

    // Mémoïrisation de la fonction de scroll
    const handleScroll = useCallback(() => {
      if (ref.current) {
        const scrollTop = ref.current.scrollTop;
        if (scrollTop > lastScrollTop) {
          dispatch(setNavStatus({ status: 'HIDDEN' }));
        } else if (scrollTop < lastScrollTop) {
          dispatch(setNavStatus({ status: 'VISIBLE' }));
        }
        setLastScrollTop(scrollTop);
      }
    }, [lastScrollTop, dispatch, ref]);

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
    }, [height, rect, ref, handleScroll]);

    // Mémoïrisation de la liste des éléments à afficher
    const renderedOrders = useMemo(
      () =>
        orders.map((historyItem: Order, index: number) => {
          const stateClass =
            historyItem.state === 'COMMING'
              ? 'history-badge-info'
              : historyItem.state === 'CANCELLED'
                ? 'history-badge-error'
                : historyItem.type_transaction === 'DEPOT'
                  ? 'history-badge-success'
                  : 'history-badge-warning';

          const stateIconClass =
            historyItem.state === 'COMMING'
              ? 'bg-info'
              : historyItem.state === 'CANCELLED'
                ? 'bg-error'
                : historyItem.type_transaction === 'DEPOT'
                  ? 'bg-success'
                  : 'bg-warning';

          const stateIcon =
            historyItem.state === 'COMMING' ? (
              <div className="bg-info flex justify-center items-center w-4 h-4 rounded-full">
                <Icon.Clock className="w-2 h-2" />
              </div>
            ) : historyItem.state === 'CANCELLED' ? (
              <div className="bg-error flex justify-center items-center w-4 h-4 rounded-full">
                <Icon.X className="w-2 h-2" />
              </div>
            ) : historyItem.type_transaction === 'DEPOT' ? (
              <div className="bg-success flex justify-center items-center w-4 h-4 rounded-full">
                <Icon.Check className="w-2 h-2" />
              </div>
            ) : (
              <div className="bg-warning flex justify-center items-center w-4 h-4 rounded-full">
                <Icon.Check className="w-2 h-2" />
              </div>
            );

          return (
            <motion.div key={index} variants={itemVariants}>
              <div
                className={`flex items-center p-3 bg-base-200 rounded-box gap-4 justify-between mb-3 history-badge relative ${stateClass} bordered`}
              >
                <div className="flex items-center gap-5">
                  <div className="avatar placeholder">
                    <div
                      className={`ring-primary w-12 rounded-full ring ring-offset-2 ${stateIconClass}`}
                    >
                      {historyItem.type_transaction === 'DEPOT' ? (
                        <Icon.BuildingFillDown className="w-6 h-6" />
                      ) : (
                        <Icon.BuildingFillUp className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Icon.WalletFill />
                      <span>{historyItem.bookmaker_identifiant}</span>
                    </div>
                    <div className="text-[12px]">
                      {historyItem.state === 'COMMING'
                        ? historyItem.type_transaction + ' en attente'
                        : historyItem.state === 'CANCELLED'
                          ? historyItem.type_transaction + ' Payment annulé'
                          : historyItem.type_transaction + ' effectué'}
                    </div>
                    <div className="text-[8px] flex items-center gap-2">
                      {stateIcon}
                    </div>
                  </div>
                </div>
                <div className="btn rounded-full bg-base-300 p-2 bordered">
                  {historyItem.montant}
                </div>
              </div>
            </motion.div>
          );
        }),
      [orders],
    );

    return (
      <motion.div
        className="p-2 overflow-y-auto pb-2"
        initial="hidden"
        animate="visible"
        variants={listVariants}
        style={{ height: `${contentHeight}px` }}
        ref={ref}
      >
        {orders.length > 0 ? (
          renderedOrders
        ) : (
          <div className="text-center">Aucune commande passée</div>
        )}
      </motion.div>
    );
  },
);
History.displayName = 'History';

export default History;
