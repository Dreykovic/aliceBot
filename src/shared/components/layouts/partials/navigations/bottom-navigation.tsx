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
      className={`btm-nav  ${pageType === 'simple' ? 'sticky' : ''} laptop:hidden bg-base-300 m-0 bottom-0 p-0 rounded-t-lg`}
    >
      {props.navs.map((nav, k) => {
        return (
          <button
            key={k + 1}
            className={`${
              nav.label === pageTitle
                ? 'border-0 bg-base-200 text-primary  btn-square rounded-lg'
                : ''
            } mx-1`}
          >
            <Link
              to={nav.path}
              className={`flex flex-col items-center tooltip `}
              data-tip={nav.label}
            >
              <div>{nav.icon}</div>

              <span className="text-[8px]">{nav.label}</span>
            </Link>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
