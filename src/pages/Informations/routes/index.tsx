// All components mapping with path for internal routes

import { lazy } from 'react';

import { RoutesConfigType } from '@/shared/types/routes-type';

const Informations = lazy(() => import('@/pages/Informations'));

const informationsRoutes: RoutesConfigType = {
  informations: {
    path: '/informations', // the url
    component: <Informations />, // view rendered
    pageName: 'Informations',
  },
};

export default informationsRoutes;
