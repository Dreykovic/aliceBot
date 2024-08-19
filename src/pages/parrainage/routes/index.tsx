// All components mapping with path for internal routes

import { lazy } from 'react';

import { RoutesConfigType } from '@/shared/types/routes-type';

const Parrainage = lazy(() => import('@/pages/parrainage'));

const parrainageRoutes: RoutesConfigType = {
  parrainage: {
    path: '/parrainage', // the url
    component: <Parrainage />, // view rendered
    pageName: 'Parrainage',
  },
};

export default parrainageRoutes;
