// All components mapping with path for internal routes

import { lazy } from 'react';

import { RoutesConfigType } from '@/shared/types/routes-type';

const MesIds = lazy(() => import('@/pages/mes-ids'));

const mesIdsRoutes: RoutesConfigType = {
  mesIds: {
    path: '/mes-ids', // the url
    component: <MesIds />, // view rendered,
    pageName: 'Mes Ids',
  },
};

export default mesIdsRoutes;
