import {
  BoxArrowDown,
  BoxArrowInDown,
  BoxArrowUp,
  ClockHistory,
  InfoCircle,
  Key,
  People,
} from 'react-bootstrap-icons';

import privateRoutes from '@/routes/private-routes';

const iconsClassName = 'w-8 h-8';
// console.log('private', privateRoutes);

const navs = [
  {
    label: 'Depot',
    icon: <BoxArrowInDown className={iconsClassName} />,
    path: privateRoutes.depot?.path,
  },
  {
    label: 'Retrait',
    icon: <BoxArrowUp className={iconsClassName} />,
    path: privateRoutes.retrait?.path,
  },
  {
    label: 'Historique',
    icon: <ClockHistory className={iconsClassName} />,
    path: privateRoutes.historique?.path,
  },
  {
    label: 'Parrainage',
    icon: <People className={iconsClassName} />,
    path: privateRoutes.parrainage?.path,
  },
  {
    label: 'Mes Ids',
    icon: <Key className={iconsClassName} />,
    path: privateRoutes.mesIds?.path,
  },
  {
    label: 'Informations',
    icon: <InfoCircle className={iconsClassName} />,
    path: privateRoutes.informations?.path,
  },
];
// console.log('navs', navs);

export default navs;
