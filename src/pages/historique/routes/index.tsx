// All components mapping with path for internal routes

import { lazy } from 'react';

import { RoutesConfigType } from '@/shared/types/routes-type';

const Historique = lazy(() => import('@/pages/historique'));

const historiqueRoutes: RoutesConfigType = {
  historique: {
    path: '/historique', // the url
    component: <Historique />, // view rendered,
    pageName: 'Historique',
  },
};

export default historiqueRoutes;
