// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import depotRoutes from '@/pages/depot/routes';
import historiqueRoutes from '@/pages/historique/routes';
import informationsRoutes from '@/pages/Informations/routes';
import parrainageRoutes from '@/pages/parrainage/routes';
import retraitRoutes from '@/pages/retrait/routes';
import { RoutesConfigType } from '@/shared/types/routes-type';

const privateRoutes: RoutesConfigType = {
  ...depotRoutes,
  ...retraitRoutes,
  ...parrainageRoutes,
  ...informationsRoutes,
  ...historiqueRoutes,
};

export default privateRoutes;
