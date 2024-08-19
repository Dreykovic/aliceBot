import React from 'react';
import { useSelector } from 'react-redux';

import AppRoutes from '@/routes';
import privateRoutes from '@/routes/private-routes';
import MainPrivateLayout from '@/shared/components/layouts/private-layouts/main';
import SimplePrivateLayout from '@/shared/components/layouts/private-layouts/simple';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { RootState } from '@/stores';

const AuthProvider: React.FC = () => {
  const { width } = useWindowDimensions();
  const { pageType } = useSelector((state: RootState) => state.header);
  return (
    <>
      {width >= 1024 || pageType === 'main' ? (
        <MainPrivateLayout>
          <AppRoutes routes={privateRoutes} />
        </MainPrivateLayout>
      ) : (
        <SimplePrivateLayout>
          <AppRoutes routes={privateRoutes} />
        </SimplePrivateLayout>
      )}
    </>
  );
};
export default AuthProvider;
