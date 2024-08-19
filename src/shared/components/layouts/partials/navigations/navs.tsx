import {
  UserIcon,
  ArchiveBoxArrowDownIcon,
  ArrowUpOnSquareIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

import privateRoutes from '@/routes/private-routes';

const iconsClassName = 'w-8 h-8';
// console.log('private', privateRoutes);

const navs = [
  {
    label: 'Depot',
    icon: <ArrowUpOnSquareIcon className={iconsClassName} />,
    path: privateRoutes.depot?.path,
  },
  {
    label: 'Retrait',
    icon: <ArchiveBoxArrowDownIcon className={iconsClassName} />,
    path: privateRoutes.retrait?.path,
  },
  {
    label: 'Parrainage',
    icon: <UserIcon className={iconsClassName} />,
    path: privateRoutes.parrainage?.path,
  },
  {
    label: 'Informations',
    icon: <InformationCircleIcon className={iconsClassName} />,
    path: privateRoutes.informations?.path,
  },
];
// console.log('navs', navs);

export default navs;
