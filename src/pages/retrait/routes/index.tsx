// All components mapping with path for internal routes

import { lazy } from 'react';

import { RoutesConfigType } from '@/shared/types/routes-type';

const Retrait = lazy(() => import('@/pages/retrait'));

const retraitRoutes: RoutesConfigType = {
  retrait: {
    path: '/retrait', // the url
    component: <Retrait />, // view rendered
    pageName: 'Retrait',
  },
};

export default retraitRoutes;
