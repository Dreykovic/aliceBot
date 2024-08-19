import { BellIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';

import { openRightDrawer } from '@/shared/components/layouts/partials/right-sidebar/right-drawer-slice';
import { RIGHT_DRAWER_TYPES } from '@/shared/utils/global-constant-util';
import { AppDispatch, RootState } from '@/stores';

export default function HeaderActions() {
  const dispatch = useDispatch<AppDispatch>();

  const { noOfNotifications } = useSelector((state: RootState) => state.header);
  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: 'Notifications',
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      }),
    );
  };

  return (
    <>
      <button
        className="btn btn-ghost ml-4  btn-circle"
        onClick={() => openNotification()}
      >
        <div className="indicator">
          <BellIcon className="h-6 w-6" />
          {noOfNotifications > 0 ? (
            <span className="indicator-item badge badge-secondary badge-sm">
              {noOfNotifications}
            </span>
          ) : null}
        </div>
      </button>
    </>
  );
}
