import { useSelector } from 'react-redux';

import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { RootState } from '@/stores';

import HeaderAvatar from './header-avatar';
import HeaderLeft from './header-left';
import HeaderLogo from './header-logo';
import HeaderTitle from './header-title';

function Header() {
  const { width } = useWindowDimensions();

  const { pageType, pageTitle } = useSelector(
    (state: RootState) => state.header,
  );

  return (
    <div className="navbar max-h-4 bg-base-200 sticky laptop:static right-0 top-0 bottom-0  z-10 shadow-md max-laptop:rounded-b-2xl laptop:border-0">
      {/* Menu toogle for mobile view or small screen */}
      <div
        className={` ${
          width >= 1024 || pageType === 'simple'
            ? 'navbar-start'
            : 'max-laptop:flex-none'
        }`}
      >
        {width < 1024 ? (
          pageType === 'simple' ? (
            pageTitle === 'Profile' || pageTitle === 'Historique' ? (
              ''
            ) : (
              <HeaderLeft />
            )
          ) : (
            <HeaderAvatar />
          )
        ) : (
          <HeaderLogo />
        )}
      </div>
      <div
        className={`${
          width >= 1024 || pageType === 'simple'
            ? 'navbar-center'
            : 'max-laptop:flex-1'
        }`}
      >
        {width >= 1024 || pageType === 'simple' ? <HeaderTitle /> : ''}
      </div>
      <div
        className={`${
          width >= 1024 || pageType === 'simple'
            ? 'navbar-end'
            : 'max-laptop:flex-none'
        } gap-2`}
      >
        {/* Notification icon */}
        {/* <HeaderActions /> */}
      </div>
    </div>
  );
}

export default Header;
