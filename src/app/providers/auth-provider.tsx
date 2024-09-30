import React, { useEffect, useState } from 'react';

import AppRoutes from '@/routes';
import privateRoutes from '@/routes/private-routes';
import MainPrivateLayout from '@/shared/components/layouts/private-layouts/main';
import BgParticles from '@/shared/components/ui/bg-particles';
import { Loading } from '@/shared/components/ui/loading';

const AuthProvider: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  });
  // console.log(loading);

  return (
    <>
      {loading === false ? (
        <MainPrivateLayout>
          <AppRoutes routes={privateRoutes} />
          <BgParticles />
        </MainPrivateLayout>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default AuthProvider;
