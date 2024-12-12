import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPageTitle, setPageType } from '@/components/header/header-slice';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch, RootState } from '@/stores';

import { useGetOrderListQuery } from './api';
import History from './components';

const Historique: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { client } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const [orderType, setOrderType] = useState<'RETRAIT' | 'DEPOT'>('DEPOT');
  const { data: orderList, isLoading } = useGetOrderListQuery(
    {
      chat_id: client?.id_chat as string,
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
                className={`btn rounded-full text-success ${orderType === 'DEPOT' ? 'shadow-lg shadow-primary' : ''} bordered`}
                onClick={() => {
                  setOrderType('DEPOT');
                }}
              >
                <Icon.BuildingFillDown className="w-6 h-6" />
              </button>
              <button
                className={`btn rounded-full text-warning ${orderType === 'RETRAIT' ? 'shadow-lg shadow-primary' : ''} bordered`}
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
                orderList?.filter(
                  (order) => order.type_transaction === orderType,
                ) ?? []
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Historique;
