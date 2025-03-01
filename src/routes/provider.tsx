import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import SuspenseContent from '@/components/ui/suspens-content';
import { RoutesConfigType } from '@/types/routes-type';

type Props = {
  routes: RoutesConfigType;
};

const RoutesProvider = ({ routes }: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<SuspenseContent />}>
      <Routes location={location} key={location.key}>
        {Object.keys(routes).map((key) => (
          <Route
            key={key}
            index={key === 'home' || key === 'login' ? true : false}
            path={routes[key].path}
            element={routes[key].component}
          />
        ))}
        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesProvider;
