// import Clock from  '@components/ui/clock';

import useTelegramUser from '@/hooks/use-telegram-user';
import { TelegramUser } from '@/types/api';

import HeaderLogo from './header-logo';
import HeaderTitle from './header-title';

function Header() {
  const user: TelegramUser | null = useTelegramUser();
  return (
    <div className="navbar max-h-4 bg-base-100 sticky laptop:static right-0 top-0 bottom-0  z-10 shadow-md max-laptop:rounded-b-2xl laptop:border-0">
      {/* Menu toogle for mobile view or small screen */}
      <div className="navbar-start">
        <HeaderLogo />
      </div>
      <div className="navbar-center">
        <HeaderTitle />
      </div>
      <div className="navbar-end">
        {/* Notification icon */}
        {/* <HeaderActions /> */}
        {`${user?.firstName} ${user?.lastName}`}
        {/* <Clock /> */}
      </div>
    </div>
  );
}

export default Header;
