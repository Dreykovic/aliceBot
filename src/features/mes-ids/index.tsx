import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPageTitle, setPageType } from '@/components/header/header-slice';
import Subtitle from '@/components/ui/Typography/subtitle';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';

const MesIds: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    // if (width >= 1024) {
    //   navigate('/');
    // }

    dispatch(setPageTitle({ title: 'Mes Ids' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);

  return (
    <>
      <div className="p-4 overflow-hidden h-full">
        <div className="my-2 text-base-300 shadow-md flex justify-between">
          <Subtitle className="">{'Mes Ids'}</Subtitle>
        </div>
      </div>
    </>
  );
};

export default MesIds;
