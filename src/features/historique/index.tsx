import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPageTitle, setPageType } from '@/components/header/header-slice';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';
import * as Icon from 'react-bootstrap-icons';
import History from './components';
import { useGetOrderListQuery } from './api';
import useTelegramUser from '@/hooks/use-telegram-user';

const Historique: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  let currentUser = useTelegramUser();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const [orderType, setOrderType] = useState<'RETRAIT' | 'DEPOT'>('DEPOT');
  const { data: orderList, isLoading } = useGetOrderListQuery(
    {
      chat_id: currentUser?.id ?? '12354867',
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  useEffect(() => {
    dispatch(setPageTitle({ title: 'Historique' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);

  return (
    <>
      <div className="p-4 overflow-hidden h-full">
        <div className="h-full ">
          <div className="flex my-1 p-1 text-base-300 justify-between gap-4 items-center ">
            <Icon.Sliders className="w-6 h-6" />
            <div className="flex justify-between items-center gap-4 my-4">
              <button
                className={`btn rounded-full text-success ${orderType === 'DEPOT' ? 'shadow-lg shadow-success' : ''}`}
                onClick={() => {
                  setOrderType('DEPOT');
                }}
              >
                <Icon.BuildingFillDown className="w-6 h-6" />
              </button>
              <button
                className={`btn rounded-full text-warning ${orderType === 'RETRAIT' ? 'shadow-lg shadow-warning' : ''}`}
                onClick={() => {
                  setOrderType('RETRAIT');
                }}
              >
                <Icon.BuildingFillDown className="w-6 h-6" />
              </button>
            </div>
            <Icon.Search className="w-6 h-6" />
          </div>
          {isLoading ? (
            <div className="w-full    flex items-center justify-center">
              <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
          ) : (
            <History
              orders={
                orderList?.filter((order) => order.order_type === orderType) ??
                []
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Historique;
