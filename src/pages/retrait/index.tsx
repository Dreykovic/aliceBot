import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  setPageTitle,
  setPageType,
} from '@/shared/components/layouts/partials/header/header-slice';
import Subtitle from '@/shared/components/ui/Typography/subtitle';
import { AppDispatch } from '@/stores';

const Retrait: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Retrait' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch]);

  return (
    <div className="h-full overflow-auto">
      <div className="my-2 text-base-300 shadow-md flex justify-between">
        <Subtitle className="">{'Retrait'}</Subtitle>
      </div>
    </div>
  );
};

export default Retrait;
