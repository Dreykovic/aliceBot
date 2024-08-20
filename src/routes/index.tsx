import { AnimatePresence, motion } from 'framer-motion';
import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import SuspenseContent from '@/shared/components/ui/suspens-content';
import { RoutesConfigType } from '@/shared/types/routes-type';

type Props = {
  routes: RoutesConfigType;
};

const AppRoutes = ({ routes }: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<SuspenseContent />}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="h-full"
        >
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
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
};

export default AppRoutes;
