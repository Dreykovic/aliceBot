import { HomeModernIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';

type Props = {
  page: string;
  icon: ReactNode;
};

const BreadcrumbsComponent: React.FC<Props> = ({ page, icon }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <HomeModernIcon />
          <a>Home</a>
        </li>
        <li>
          <a>
            {icon}
            {page}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BreadcrumbsComponent;
