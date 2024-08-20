import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setPageTitle,
  setPageType,
} from '@/shared/components/layouts/partials/header/header-slice';
import Subtitle from '@/shared/components/ui/Typography/subtitle';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';

import History from './components';

const Historique: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1024) {
      navigate('/');
    }

    dispatch(setPageTitle({ title: 'Historique' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);

  return (
    <>
      <div className="p-4 overflow-hidden h-full">
        <div className="my-2 text-base-300 shadow-md flex justify-between">
          <Subtitle className="">{'Historique'}</Subtitle>
        </div>
        <History />
      </div>
    </>
  );
};

export default Historique;
