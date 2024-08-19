import { ReactNode } from 'react';

export type RoutesConfigType = {
  [key: string]: { path: string; component: ReactNode; pageName: string };
};

export type NavType = {
  label: string;
  path: string;
  icon: ReactNode;
};
