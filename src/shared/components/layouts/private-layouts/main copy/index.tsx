import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '@/shared/components/layouts/partials/header';
import { setPageType } from '@/shared/components/layouts/partials/header/header-slice';
import Navigations from '@/shared/components/layouts/partials/navigations';

import { AppDispatch } from '@/stores';

type Props = {
  children: ReactNode;
};
function MainPrivateLayout(props: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch]);
  return (
    <>
      {/* Layout contenant le menu principale */}
      <div className=" bg-base-300">
        <div className="w-full  h-full absolute max-laptop:top-0 max-laptop:left-0  bg-neutral ">
          <main className="h-full relative w-full overflow-auto">
            <Header />
            <div className="mx-1 pb-4">
              <div className={`relative mt-6 bg-red-900 px-3 h-full `}>
                {props.children}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Navigations />
    </>
  );
}

export default MainPrivateLayout;
