import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RIGHT_DRAWER_TYPES } from '@/shared/utils/global-constant-util';
import { AppDispatch, RootState } from '@/stores';

const NotificationBodyRightDrawer = lazy(
  () => import('./notification-body-right-drawer'),
);
import { closeRightDrawer } from './right-drawer-slice';

function RightSidebar() {
  const { isOpen, bodyType, extraObject, header } = useSelector(
    (state: RootState) => state.rightDrawer,
  );
  const dispatch = useDispatch<AppDispatch>();

  const close = () => {
    dispatch(closeRightDrawer());
  };

  return (
    <div
      className={
        ' fixed overflow-hidden z-20 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')
      }
    >
      <section
        className={
          'w-80 tablet:w-96  right-0 absolute bg-base-100 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <div className="relative  pb-5 flex flex-col  h-full">
          {/* Header */}
          <div className="navbar   flex pl-4 pr-4   shadow-md ">
            <button
              className="float-left btn btn-ghost btn-circle btn-sm"
              onClick={() => close()}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <span className="ml-2 font-bold text-xl">{header}</span>
          </div>

          {/* ------------------ Content Start ------------------ */}
          <div className="overflow-y-scroll pl-4 pr-4">
            <div className="flex flex-col w-full">
              {/* Loading drawer body according to different drawer type */}
              {
                {
                  [RIGHT_DRAWER_TYPES.NOTIFICATION]: (
                    <NotificationBodyRightDrawer {...extraObject} />
                  ),

                  [RIGHT_DRAWER_TYPES.DEFAULT]: <div></div>,
                }[bodyType]
              }
            </div>
          </div>
          {/* ------------------ Content End ------------------ */}
        </div>
      </section>

      <section
        className=" w-screen h-full cursor-pointer "
        onClick={close}
      ></section>
    </div>
  );
}

export default RightSidebar;
