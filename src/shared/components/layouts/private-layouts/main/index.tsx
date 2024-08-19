import { ReactNode, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Header from '@/shared/components/layouts/partials/header';
import { setPageType } from '@/shared/components/layouts/partials/header/header-slice';
import Navigations from '@/shared/components/layouts/partials/navigations';
import RightSidebar from '@/shared/components/layouts/partials/right-sidebar';
import useBoundingClientRect from '@/shared/hooks/use-bounding-client-rect';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';

type Props = {
  children: ReactNode;
};
function MainPrivateLayout(props: Props) {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowDimensions();
  const [rect, ref] = useBoundingClientRect<HTMLDivElement>();
  const [contentHeight, setContentHeight] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (rect) {
      setContentHeight(height - rect.top);
      dispatch(setPageType({ type: 'main' }));
    }
  }, [height, rect, dispatch]);
  return (
    <>
      {/* Layout contenant le menu principale */}
      <div className="laptop:flex laptop:items-center laptop:justify-center laptop:w-screen laptop:h-screen bg-base-300">
        <div className="w-full desktop:max-w-[1900px] laptop:h-full h-full absolute max-laptop:top-0 max-laptop:left-0 laptop:top-1/2 laptop:left-1/2 laptop:transform laptop:-translate-x-1/2 laptop:-translate-y-1/2 laptop:overflow-hidden bg-neutral border-b-8 border-b-ternary">
          <div
            className="h-full laptop:grid  relative w-full"
            style={
              width >= 1024
                ? { gridTemplateColumns: 'minmax(60px, 70px) repeat(9, 1fr)' }
                : {}
            }
          >
            <main
              className=" laptop:col-span-9 bg-ternary "
              ref={mainContentRef}
            >
              <Header />

              <div className="mx-4 py-4">
                <div
                  className={`relative mt-6 bg-neutral px-3 `}
                  ref={ref}
                  style={
                    width >= 1024
                      ? { height: `${contentHeight}px` }
                      : { height: '100%' }
                  }
                >
                  {props.children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Navigations />

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />
    </>
  );
}

export default MainPrivateLayout;
