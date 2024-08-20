import privateRoutes from '@/routes/private-routes';
import {
  BoxArrowDown,
  BoxArrowUp,
  ClockHistory,
  InfoCircle,
  People,
} from 'react-bootstrap-icons';

const iconsClassName = 'w-8 h-8';
// console.log('private', privateRoutes);

const navs = [
  {
    label: 'Depot',
    icon: <BoxArrowDown className={iconsClassName} />,
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
    label: 'Informations',
    icon: <InfoCircle className={iconsClassName} />,
    path: privateRoutes.informations?.path,
  },
];
// console.log('navs', navs);

export default navs;
