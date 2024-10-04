// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import Informations from '@/features/Informations';
import DepotPage from '@/pages/depot-page';
import HistoriquePage from '@/pages/historique-page';
import MesIdsPage from '@/pages/mes-ids-page';
import ParrainagePage from '@/pages/parrainage-page';
import RetraitPage from '@/pages/retrait-page';
import { RoutesConfigType } from '@/types/routes-type';

const privateRoutes: RoutesConfigType = {
  retrait: {
    path: '/retrait', // the url
    component: <RetraitPage />, // view rendered
    pageName: 'Retrait',
  },
  depot: {
    path: '/', // the url
    component: <DepotPage />, // view rendered
    pageName: 'Depot',
  },
  historique: {
    path: '/historique', // the url
    component: <HistoriquePage />, // view rendered,
    pageName: 'Historique',
  },
  parrainage: {
    path: '/parrainage', // the url
    component: <ParrainagePage />, // view rendered
    pageName: 'Parrainage',
  },
  informations: {
    path: '/informations', // the url
    component: <Informations />, // view rendered
    pageName: 'Informations',
  },
  mesIds: {
    path: '/mes-ids', // the url
    component: <MesIdsPage />, // view rendered,
    pageName: 'Mes Ids',
  },
};

export default privateRoutes;
