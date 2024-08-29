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
import Form from './components';
import { BoxArrowInDown } from 'react-bootstrap-icons';

const Depot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1024) {
      navigate('/');
    }

    dispatch(setPageTitle({ title: 'Depot' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);

  return (
    <>
      <div className="p-4 overflow-hidden h-full text-neutral-content">
        <div className="w-full p- m-auto  ">
          <header>
            <div className="my-2 flex justify-between items-center flex-col text-neutral-content">
              <BoxArrowInDown className="w-12 h-12" />
              <Subtitle className="">{'Depot'}</Subtitle>
            </div>
          </header>
          <Form />
        </div>
      </div>
    </>
  );
};

export default Depot;
