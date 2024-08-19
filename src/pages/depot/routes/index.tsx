// All components mapping with path for internal routes

import { lazy } from 'react';

import { RoutesConfigType } from '@/shared/types/routes-type';

const Depot = lazy(() => import('@/pages/depot'));

const depotRoutes: RoutesConfigType = {
  depot: {
    path: '/', // the url
    component: <Depot />, // view rendered,
    pageName: 'Depot',
  },
};

export default depotRoutes;
