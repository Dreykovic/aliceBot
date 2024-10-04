// All components mapping with path for internal routes

import { lazy } from 'react';

import { RoutesConfigType } from '@/types/routes-type';

const Order = lazy(() => import('@/features/order'));

const orderRoutes: RoutesConfigType = {
  retrait: {
    path: '/retrait', // the url
    component: <Order title="Retrait" type="RETRAIT" />, // view rendered
    pageName: 'Retrait',
  },
  depot: {
    path: '/', // the url
    component: <Order title="Dépôt" type="DEPOT" />, // view rendered
    pageName: 'Depot',
  },
};

export default orderRoutes;
