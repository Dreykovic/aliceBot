import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import BgParticles from '@/components/ui/bg-particles';
import { Loading } from '@/components/ui/loading';
import Layout from '@/layouts';
import routes from '@/routes';
import RoutesProvider from '@/routes/provider';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  // console.log(loading);
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {loading === false ? (
        <Layout>
          <RoutesProvider routes={routes} />
          <BgParticles />
        </Layout>
      ) : (
        <Loading />
      )}
    </ErrorBoundary>
  );
};

export default App;
