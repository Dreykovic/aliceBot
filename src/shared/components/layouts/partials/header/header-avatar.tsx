import { useSelector } from 'react-redux';

import { RootState } from '@/stores';

export default function HeaderAvatar() {
  const { authUser } = useSelector((state: RootState) => state.auth);

  return (
    <div className="avatar mx-2">
      <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
      <h1 className="text-xl font-semibold ml-2">{`${authUser?.lastname} ${authUser?.firstname}`}</h1>
    </div>
  );
}
