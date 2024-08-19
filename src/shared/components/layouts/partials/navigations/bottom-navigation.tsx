import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { NavType } from '@/shared/types/routes-type';
import { RootState } from '@/stores';

type Props = {
  navs: NavType[];
};
const BottomNavigation = (props: Props) => {
  const { pageTitle, pageType } = useSelector(
    (state: RootState) => state.header,
  );
  return (
    <div
      className={`btm-nav ${pageType === 'simple' ? 'sticky' : ''} laptop:hidden bg-base-300 m-0 bottom-0 p-0 rounded-t-lg`}
    >
      {props.navs.map((nav, k) => {
        return (
          <button
            className={nav.label === pageTitle ? '  border-0 text-primary' : ''}
            key={k}
          >
            <Link to={nav.path} className="flex flex-col items-center">
              {nav.icon}

              <span className="btm-nav-label">{nav.label}</span>
            </Link>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
