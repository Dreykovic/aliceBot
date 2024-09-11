import { lazy, Suspense } from 'react';
import { RoutesConfigType } from '@/shared/types/routes-type';

// Fonction pour gérer l'importation dynamique avec gestion des erreurs
const lazyWithRetry = (importFunction: () => Promise<any>) => {
  return lazy(() =>
    importFunction().catch((error) => {
      console.error("Erreur lors du chargement du module :", error);
      return { default: () => <div>Erreur de chargement du module.</div> }; // Composant de fallback en cas d'échec
    })
  );
};

// Lazy load avec gestion des erreurs
const MesIds = lazyWithRetry(() => import('@/pages/mes-ids'));

const mesIdsRoutes: RoutesConfigType = {
  mesIds: {
    path: '/mes-ids', // the url
    component: (
      <Suspense fallback={<div>Loading...</div>}>
        <MesIds />
      </Suspense>
    ), // view rendered
    pageName: 'Mes Ids',
  },
};

export default mesIdsRoutes;
