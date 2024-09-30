// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import historiqueRoutes from '@/pages/historique/routes';
import informationsRoutes from '@/pages/Informations/routes';
import mesIdsRoutes from '@/pages/mes-ids/routes';
import orderRoutes from '@/pages/order/routes';
import parrainageRoutes from '@/pages/parrainage/routes';
import { RoutesConfigType } from '@/shared/types/routes-type';

const privateRoutes: RoutesConfigType = {
  ...orderRoutes,
  ...parrainageRoutes,
  ...informationsRoutes,
  ...historiqueRoutes,
  ...mesIdsRoutes,
};

export default privateRoutes;
