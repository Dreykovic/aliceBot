import { lazy } from 'react';

const BottomNavigation = lazy(() => import('./bottom-navigation'));
import navs from './navs';

export default function Navigations() {
  return <BottomNavigation navs={navs} />;
}
