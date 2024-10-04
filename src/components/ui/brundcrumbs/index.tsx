import React, { ReactNode } from 'react';
import { HouseExclamationFill } from 'react-bootstrap-icons';

type Props = {
  page: string;
  icon: ReactNode;
};

const BreadcrumbsComponent: React.FC<Props> = ({ page, icon }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <HouseExclamationFill />
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
