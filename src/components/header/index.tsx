import HeaderLogo from './header-logo';
import HeaderTitle from './header-title';

function Header() {
  return (
    <div className="navbar max-h-4 bg-base-100 sticky laptop:static right-0 top-0 bottom-0  z-10 shadow-md max-laptop:rounded-b-2xl laptop:border-0 bordered">
      {/* Menu toogle for mobile view or small screen */}
      <div className="navbar-start">
        <HeaderLogo />
      </div>
      <div className="navbar-center">
        <HeaderTitle />
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}

export default Header;
