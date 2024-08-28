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
      className={`btm-nav  ${pageType === 'simple' ? 'sticky' : ''} laptop:hidden bg-base-300 m-0 bottom-0 p-0 rounded-t-2xl`}
    >
      {props.navs.map((nav, k) => {
        return (
          <button key={k + 1} className={` mx-1`}>
            <Link
              to={nav.path}
              className={`flex flex-col items-center absolute tooltip bottom-1`}
              data-tip={nav.label}
            >
              {/* <div
                className={`${nav.label === pageTitle ? activeClassNames : ''} `}
              >
                <div className="ring ring-neutral">{nav.icon}</div>
              </div> */}
              <div
                className={`${nav.label === pageTitle ? 'avatar placeholder -translate-y-4 transform-gpu' : ''} `}
              >
                <div
                  className={`${nav.label === pageTitle ? 'ring-neutral w-12 rounded-full ring ring-offset-2 ring-offset-neutral bg-primary' : ''} `}
                >
                  {nav.icon}
                </div>
              </div>
              <span className="text-[8px]">{nav.label}</span>
            </Link>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
