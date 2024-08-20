import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  setPageTitle,
  setPageType,
} from '@/shared/components/layouts/partials/header/header-slice';
import Subtitle from '@/shared/components/ui/Typography/subtitle';
import { AppDispatch } from '@/stores';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';

const Informations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1024) {
      navigate('/');
    }

    dispatch(setPageTitle({ title: 'Informations' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);

  return (
    <div className="h-full overflow-auto">
      <div className="my-2 text-base-300 shadow-md flex justify-between">
        <Subtitle className="">{'Informations'}</Subtitle>
      </div>
    </div>
  );
};

export default Informations;
