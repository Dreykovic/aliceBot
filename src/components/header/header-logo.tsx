import { Link } from 'react-router-dom';

import Logo from '@/assets/images/logo/logo-bg.png';

export default function HeaderLogo() {
  // const { authUser } = useSelector((state: RootState) => state.auth);

  return (
    <Link to={'/'}>
      <div className="avatar mx-2">
        <div className="w-16 rounded-full  ring-offset-base-100 ring-offset-2">
          <img src={Logo} />
        </div>
        {/* <h1 className="text-xl font-semibold ml-2">AliceBot</h1> */}
      </div>
    </Link>
  );
}
