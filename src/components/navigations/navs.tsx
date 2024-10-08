import {
  BoxArrowInDown,
  BoxArrowUp,
  ClockHistory,
  InfoCircle,
  Key,
  People,
} from 'react-bootstrap-icons';

import routes from '@/routes';

const iconsClassName = 'w-8 h-8 ';
// console.log('private', routes);

const navs = [
  {
    label: 'Dépôt',
    icon: <BoxArrowInDown className={iconsClassName} />,
    path: routes.depot?.path,
  },
  {
    label: 'Retrait',
    icon: <BoxArrowUp className={iconsClassName} />,
    path: routes.retrait?.path,
  },
  {
    label: 'Historique',
    icon: <ClockHistory className={iconsClassName} />,
    path: routes.historique?.path,
  },
  {
    label: 'Parrainage',
    icon: <People className={iconsClassName} />,
    path: routes.parrainage?.path,
  },
  {
    label: 'Mes Ids',
    icon: <Key className={iconsClassName} />,
    path: routes.mesIds?.path,
  },
  {
    label: 'Informations',
    icon: <InfoCircle className={iconsClassName} />,
    path: routes.informations?.path,
  },
];
// console.log('navs', navs);

export default navs;
